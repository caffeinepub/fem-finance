import { useBackend } from "@/hooks/useBackend";
import { useLanguage } from "@/hooks/useLanguage";
import type { LeadInput } from "@/types";
import { CheckCircle, Shield, TrendingUp, Users } from "lucide-react";
import { type FormEvent, useState } from "react";

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  {
    icon: Users,
    valueEN: "500+",
    labelEN: "Happy Clients",
    labelHI: "खुश ग्राहक",
  },
  {
    icon: TrendingUp,
    valueEN: "10+",
    labelEN: "Years Experience",
    labelHI: "वर्ष का अनुभव",
  },
  { icon: Shield, valueEN: "4", labelEN: "Core Services", labelHI: "मुख्य सेवाएं" },
] as const;

// ── Initial form state ─────────────────────────────────────────────────────────
const EMPTY_FORM: LeadInput = { name: "", phone: "", city: "" };

// ── Validation ─────────────────────────────────────────────────────────────────
function validate(form: LeadInput): Partial<Record<keyof LeadInput, string>> {
  const errors: Partial<Record<keyof LeadInput, string>> = {};
  if (!form.name.trim()) errors.name = "Required";
  if (!form.phone.trim()) errors.phone = "Required";
  else if (!/^\d{10}$/.test(form.phone.trim()))
    errors.phone = "Must be 10 digits";
  if (!form.city.trim()) errors.city = "Required";
  return errors;
}

export function Home() {
  const { t } = useLanguage();
  const { submitLead, isReady } = useBackend();

  const [form, setForm] = useState<LeadInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LeadInput, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof LeadInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    await submitLead({
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
    });
    setSubmitting(false);
    setSuccess(true);
    setForm(EMPTY_FORM);
    setErrors({});
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="bg-primary px-5 pt-7 pb-8">
        <p className="text-primary-foreground/80 text-sm font-body mb-1">
          {t("FEM — Future Expense Manager", "FEM — फ्यूचर एक्सपेंस मैनेजर")}
        </p>
        <h1 className="font-display font-bold text-2xl leading-snug text-primary-foreground mb-3">
          {t("Get Free Financial\nConsultation", "मुफ्त वित्तीय\nपरामर्श पाएं")}
        </h1>
        <p className="text-primary-foreground/85 text-sm leading-relaxed max-w-xs">
          {t(
            "Expert guidance on insurance, mutual funds, and loan planning for your family.",
            "आपके परिवार के लिए बीमा, म्यूचुअल फंड और लोन प्लानिंग पर विशेषज्ञ मार्गदर्शन।",
          )}
        </p>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <section className="bg-primary/90 px-5 pb-5">
        <div className="grid grid-cols-3 gap-2">
          {STATS.map(({ icon: Icon, valueEN, labelEN, labelHI }) => (
            <div
              key={labelEN}
              className="flex flex-col items-center bg-primary-foreground/10 rounded-xl py-3 px-1"
            >
              <Icon className="w-5 h-5 text-primary-foreground/80 mb-1" />
              <span className="font-display font-bold text-lg text-primary-foreground leading-none">
                {valueEN}
              </span>
              <span className="text-primary-foreground/75 text-[11px] text-center mt-0.5 leading-tight">
                {t(labelEN, labelHI)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lead Form ───────────────────────────────────────────────────────── */}
      <section className="bg-background px-5 py-6">
        <h2 className="font-display font-bold text-xl text-foreground mb-1">
          {t("Request a Callback", "कॉलबैक का अनुरोध करें")}
        </h2>
        <p className="text-muted-foreground text-sm mb-5">
          {t(
            "Fill in your details and we'll reach out shortly.",
            "अपनी जानकारी भरें, हम जल्द संपर्क करेंगे।",
          )}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
          data-ocid="lead-form"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lead-name"
              className="text-sm font-medium text-foreground"
            >
              {t("Name", "नाम")}
            </label>
            <input
              id="lead-name"
              type="text"
              inputMode="text"
              autoComplete="name"
              placeholder={t("Enter your name", "अपना नाम दर्ज करें")}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`input-field ${errors.name ? "border-destructive ring-destructive/30 focus:ring-destructive/50" : ""}`}
              data-ocid="lead-name-input"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
            />
            {errors.name && (
              <span id="lead-name-error" className="text-destructive text-xs">
                {t(errors.name, "आवश्यक है")}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lead-phone"
              className="text-sm font-medium text-foreground"
            >
              {t("Phone Number", "फोन नंबर")}
            </label>
            <input
              id="lead-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              placeholder={t("10-digit mobile number", "10 अंकों का मोबाइल नंबर")}
              value={form.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value.replace(/\D/g, ""))
              }
              className={`input-field ${errors.phone ? "border-destructive ring-destructive/30 focus:ring-destructive/50" : ""}`}
              data-ocid="lead-phone-input"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            />
            {errors.phone && (
              <span id="lead-phone-error" className="text-destructive text-xs">
                {t(
                  errors.phone,
                  errors.phone === "Required" ? "आवश्यक है" : "10 अंक होने चाहिए",
                )}
              </span>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lead-city"
              className="text-sm font-medium text-foreground"
            >
              {t("City", "शहर")}
            </label>
            <input
              id="lead-city"
              type="text"
              inputMode="text"
              autoComplete="address-level2"
              placeholder={t("Your city", "आपका शहर")}
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={`input-field ${errors.city ? "border-destructive ring-destructive/30 focus:ring-destructive/50" : ""}`}
              data-ocid="lead-city-input"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "lead-city-error" : undefined}
            />
            {errors.city && (
              <span id="lead-city-error" className="text-destructive text-xs">
                {t(errors.city, "आवश्यक है")}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !isReady}
            className="btn-primary w-full text-base px-6 py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-ocid="lead-submit-btn"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                {t("Submitting…", "भेज रहे हैं…")}
              </>
            ) : (
              t("Request Callback", "कॉलबैक का अनुरोध करें")
            )}
          </button>

          {/* Success message */}
          {success && (
            <output
              className="flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/30 px-4 py-3 text-accent text-sm font-medium"
              aria-live="polite"
              data-ocid="lead-success-msg"
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              {t(
                "Thank you! We will contact you soon.",
                "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।",
              )}
            </output>
          )}
        </form>
      </section>

      {/* ── Trust section ───────────────────────────────────────────────────── */}
      <section className="bg-muted/40 px-5 py-6 border-t border-border">
        <h2 className="font-display font-bold text-lg text-foreground mb-4">
          {t("Why Families Trust Us", "परिवार हम पर क्यों भरोसा करते हैं")}
        </h2>
        <div className="flex flex-col gap-3">
          {[
            {
              en: "Certified financial advisors with 10+ years of hands-on experience.",
              hi: "10+ वर्षों के अनुभव वाले प्रमाणित वित्तीय सलाहकार।",
            },
            {
              en: "Personalized plans tailored to your income, goals, and family needs.",
              hi: "आपकी आय, लक्ष्यों और परिवार की जरूरतों के अनुसार व्यक्तिगत योजनाएं।",
            },
            {
              en: "End-to-end support — from planning to policy renewal and beyond.",
              hi: "योजना से लेकर पॉलिसी नवीनीकरण तक पूर्ण सहायता।",
            },
          ].map(({ en, hi }) => (
            <div key={en} className="flex gap-3 items-start">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                {t(en, hi)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
