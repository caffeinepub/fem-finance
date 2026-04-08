import { useBackend } from "@/hooks/useBackend";
import { useLanguage } from "@/hooks/useLanguage";
import type { ContactInput } from "@/types";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/919027933533?text=Hello%2C%20I%20want%20financial%20advice.";
const PHONE_NUMBER = "tel:+919027933533";

export function ContactPage() {
  const { t } = useLanguage();
  const { submitContactMessage, isReady } = useBackend();

  const [form, setForm] = useState<ContactInput>({
    name: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactInput>>({});

  function validate(): boolean {
    const next: Partial<ContactInput> = {};
    if (!form.name.trim()) next.name = t("Name is required", "नाम आवश्यक है");
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      next.phone = t("Enter a valid 10-digit number", "10 अंकों का नंबर दर्ज करें");
    if (!form.message.trim())
      next.message = t("Message is required", "संदेश आवश्यक है");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const ok = await submitContactMessage(form);
    setSubmitting(false);
    if (ok) {
      setSuccess(true);
      setForm({ name: "", phone: "", message: "" });
      setErrors({});
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Page Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          {t("Contact Us", "हमसे संपर्क करें")}
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          {t(
            "We're here to help. Reach out anytime.",
            "हम आपकी सहायता के लिए यहाँ हैं। कभी भी संपर्क करें।",
          )}
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={PHONE_NUMBER}
          className="flex flex-col items-center justify-center gap-2 min-h-[72px] rounded-2xl border border-primary/30 bg-primary/5 text-primary font-semibold text-sm transition-colors duration-200 hover:bg-primary/10 active:bg-primary/20"
          data-ocid="contact-call-btn"
        >
          <Phone className="w-6 h-6" />
          {t("Call Us", "कॉल करें")}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-2 min-h-[72px] rounded-2xl border font-semibold text-sm transition-colors duration-200"
          style={{
            borderColor:
              "color-mix(in oklch, var(--whatsapp) 40%, transparent)",
            background: "color-mix(in oklch, var(--whatsapp) 10%, transparent)",
            color: "var(--whatsapp-dark)",
          }}
          data-ocid="contact-whatsapp-btn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("WhatsApp", "व्हाट्सऐप")}
        </a>
      </div>

      {/* Contact Info Card */}
      <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
        <h2 className="font-semibold text-base text-foreground">
          {t("Contact Information", "संपर्क जानकारी")}
        </h2>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </span>
          <div>
            <p className="text-muted-foreground text-xs">{t("Phone", "फ़ोन")}</p>
            <a
              href={PHONE_NUMBER}
              className="font-medium text-foreground hover:text-primary transition-colors"
              data-ocid="contact-phone-link"
            >
              091-9027933533
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary" />
          </span>
          <div>
            <p className="text-muted-foreground text-xs">{t("Email", "ईमेल")}</p>
            <a
              href="mailto:kailashbhardwaj001@gmail.com"
              className="font-medium text-foreground hover:text-primary transition-colors break-all"
              data-ocid="contact-email-link"
            >
              kailashbhardwaj001@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background:
                "color-mix(in oklch, var(--whatsapp) 15%, transparent)",
            }}
          >
            <MessageSquare
              className="w-4 h-4"
              style={{ color: "var(--whatsapp-dark)" }}
            />
          </span>
          <div>
            <p className="text-muted-foreground text-xs">WhatsApp</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors"
              style={{ color: "var(--whatsapp-dark)" }}
              data-ocid="contact-whatsapp-link"
            >
              +91 9027933533
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="rounded-2xl bg-card border border-border p-4">
        <h2 className="font-semibold text-base text-foreground mb-4">
          {t("Send Us a Message", "हमें संदेश भेजें")}
        </h2>

        {success && (
          <div
            className="mb-4 rounded-xl px-4 py-3 text-sm font-medium text-center border bg-accent/10 text-accent border-accent/30"
            data-ocid="contact-success-msg"
          >
            {t(
              "Message sent! We will contact you soon.",
              "संदेश भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।",
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              {t("Your Name", "आपका नाम")}
              <span className="text-destructive ml-0.5">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              onBlur={validate}
              placeholder={t("e.g. Rajesh Kumar", "जैसे: राजेश कुमार")}
              className="w-full min-h-[48px] rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              data-ocid="contact-name-input"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium text-foreground mb-1"
            >
              {t("Phone Number", "फ़ोन नंबर")}
              <span className="text-destructive ml-0.5">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              onBlur={validate}
              placeholder={t("10-digit mobile number", "10 अंकों का नंबर")}
              className="w-full min-h-[48px] rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              data-ocid="contact-phone-input"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-foreground mb-1"
            >
              {t("Message", "संदेश")}
              <span className="text-destructive ml-0.5">*</span>
            </label>
            <textarea
              id="contact-message"
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              onBlur={validate}
              rows={4}
              placeholder={t(
                "How can we help you?",
                "हम आपकी कैसे मदद कर सकते हैं?",
              )}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors resize-none"
              data-ocid="contact-message-input"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !isReady}
            className="w-full min-h-[52px] rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-ocid="contact-submit-btn"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                {t("Sending...", "भेजा जा रहा है...")}
              </>
            ) : (
              t("Send Message", "संदेश भेजें")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
