import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface ServiceData {
  id: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  titleEN: string;
  titleHI: string;
  taglineEN: string;
  taglineHI: string;
  descEN: string;
  descHI: string;
  benefitsEN: string[];
  benefitsHI: string[];
}

const SERVICE_MAP: Record<string, ServiceData> = {
  "life-insurance": {
    id: "life-insurance",
    icon: <ShieldCheck size={36} strokeWidth={1.6} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    titleEN: "Life Insurance",
    titleHI: "जीवन बीमा",
    taglineEN: "Protect Your Family's Future",
    taglineHI: "अपने परिवार का भविष्य सुरक्षित करें",
    descEN:
      "Life insurance is the cornerstone of financial planning for every family. It ensures your loved ones are financially protected in case of an unfortunate event, replacing lost income and covering future expenses. Our advisors help you find the right cover at the most affordable premium.",
    descHI:
      "जीवन बीमा हर परिवार की वित्तीय योजना की नींव है। यह सुनिश्चित करता है कि किसी दुर्भाग्यपूर्ण घटना की स्थिति में आपके प्रियजन आर्थिक रूप से सुरक्षित रहें। हमारे सलाहकार आपको सबसे किफायती प्रीमियम पर सही बीमा दिलाने में मदद करते हैं।",
    benefitsEN: [
      "Financial security for your family",
      "Tax benefits under Section 80C",
      "Affordable premiums starting ₹500/month",
      "Term, Endowment & ULIP plans available",
      "Easy claim settlement process",
    ],
    benefitsHI: [
      "परिवार की आर्थिक सुरक्षा",
      "धारा 80C के तहत कर लाभ",
      "₹500/माह से शुरू किफायती प्रीमियम",
      "टर्म, एंडोमेंट और ULIP योजनाएं उपलब्ध",
      "आसान दावा निपटान प्रक्रिया",
    ],
  },
  "health-insurance": {
    id: "health-insurance",
    icon: <Heart size={36} strokeWidth={1.6} />,
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    titleEN: "Health Insurance",
    titleHI: "स्वास्थ्य बीमा",
    taglineEN: "Cashless Care When You Need It Most",
    taglineHI: "जब जरूरत हो तब कैशलेस उपचार",
    descEN:
      "Rising healthcare costs can drain your savings in a medical emergency. Health insurance protects you and your entire family from unexpected hospital bills, surgeries, and critical illness expenses. With cashless treatment at 5,000+ network hospitals across India, you can focus on recovery — not costs.",
    descHI:
      "बढ़ती स्वास्थ्य सेवा लागत किसी चिकित्सा आपात स्थिति में आपकी बचत को खाली कर सकती है। स्वास्थ्य बीमा आपको और आपके पूरे परिवार को अप्रत्याशित अस्पताल बिलों से बचाता है। 5,000+ नेटवर्क अस्पतालों में कैशलेस उपचार के साथ, आप इलाज पर ध्यान दें, खर्च पर नहीं।",
    benefitsEN: [
      "Cashless treatment at 5,000+ hospitals",
      "Cover for entire family in one plan",
      "Pre & post hospitalization expenses",
      "Critical illness & daycare coverage",
      "No-claim bonus every year",
    ],
    benefitsHI: [
      "5,000+ अस्पतालों में कैशलेस इलाज",
      "एक ही योजना में पूरे परिवार का कवर",
      "अस्पताल में भर्ती से पहले और बाद के खर्च",
      "गंभीर बीमारी और डेकेयर कवरेज",
      "हर साल नो-क्लेम बोनस",
    ],
  },
  "mutual-funds": {
    id: "mutual-funds",
    icon: <TrendingUp size={36} strokeWidth={1.6} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    titleEN: "Mutual Funds",
    titleHI: "म्यूचुअल फंड",
    taglineEN: "Grow Wealth the Smart Way",
    taglineHI: "स्मार्ट तरीके से संपत्ति बढ़ाएं",
    descEN:
      "Mutual funds offer a professional, diversified approach to growing your wealth over time. Whether you want to save for your child's education, buy a home, or plan for retirement, our expert advisors recommend the best funds matching your risk appetite and timeline. Start an SIP with as little as ₹500 per month.",
    descHI:
      "म्यूचुअल फंड समय के साथ आपकी संपत्ति बढ़ाने का एक पेशेवर और विविधीकृत तरीका है। चाहे आप बच्चे की शिक्षा, घर खरीदना या रिटायरमेंट के लिए बचत करना चाहते हों, हमारे सलाहकार आपके जोखिम प्रोफाइल के अनुसार सर्वश्रेष्ठ फंड सुझाते हैं। ₹500/माह से SIP शुरू करें।",
    benefitsEN: [
      "Start SIP from just ₹500/month",
      "Professionally managed portfolios",
      "ELSS funds for tax saving under 80C",
      "Diversified equity & debt options",
      "Easy online tracking & withdrawal",
    ],
    benefitsHI: [
      "सिर्फ ₹500/माह से SIP शुरू करें",
      "पेशेवर रूप से प्रबंधित पोर्टफोलियो",
      "80C के तहत कर बचत के लिए ELSS फंड",
      "विविधीकृत इक्विटी और डेट विकल्प",
      "आसान ऑनलाइन ट्रैकिंग और निकासी",
    ],
  },
  "loan-services": {
    id: "loan-services",
    icon: <Wallet size={36} strokeWidth={1.6} />,
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    titleEN: "Loan Services",
    titleHI: "ऋण सेवाएं",
    taglineEN: "Quick Loans, Minimal Paperwork",
    taglineHI: "त्वरित ऋण, कम कागजी कार्रवाई",
    descEN:
      "Whether it's a home loan, personal loan, or business loan, getting the right financing at the best interest rate can save you lakhs over the tenure. Our advisors compare offers from leading banks and NBFCs to find the best deal for your needs and credit profile, with minimal documentation.",
    descHI:
      "चाहे होम लोन हो, पर्सनल लोन हो या बिजनेस लोन — सही दर पर सही वित्तपोषण पाना आपको कार्यकाल में लाखों बचा सकता है। हमारे सलाहकार प्रमुख बैंकों और NBFCs के प्रस्तावों की तुलना करके आपके लिए सर्वोत्तम डील ढूंढते हैं।",
    benefitsEN: [
      "Home, personal & business loans",
      "Competitive interest rates comparison",
      "Quick approval in 24–48 hours",
      "Minimal documentation required",
      "Doorstep assistance available",
    ],
    benefitsHI: [
      "होम, पर्सनल और बिजनेस लोन",
      "प्रतिस्पर्धी ब्याज दरों की तुलना",
      "24–48 घंटों में त्वरित अनुमोदन",
      "न्यूनतम दस्तावेज़ीकरण",
      "घर पर सहायता उपलब्ध",
    ],
  },
};

export function ServiceDetailPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { serviceId } = useParams({ from: "/services/$serviceId" });

  const service = SERVICE_MAP[serviceId];

  if (!service) {
    return (
      <div className="px-4 py-12 text-center space-y-4">
        <p className="text-muted-foreground">
          {t("Service not found.", "सेवा नहीं मिली।")}
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/services" })}
          className="btn-primary px-6 py-3"
        >
          {t("Back to Services", "सेवाओं पर वापस जाएं")}
        </button>
      </div>
    );
  }

  const handleGetInTouch = () => {
    sessionStorage.setItem("fem_service_tag", service.id);
    navigate({ to: "/" });
  };

  return (
    <div className="pb-28">
      {/* Hero Banner */}
      <div className={`px-4 pt-6 pb-8 ${service.bgClass}`}>
        {/* Back button */}
        <button
          type="button"
          data-ocid="service-detail-back"
          onClick={() => navigate({ to: "/services" })}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-4 touch-target"
          aria-label={t("Back to services", "सेवाओं पर वापस जाएं")}
        >
          <ArrowLeft size={16} />
          {t("Services", "सेवाएं")}
        </button>

        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${service.bgClass} ${service.colorClass} border border-border`}
          >
            {service.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="section-title text-2xl leading-tight">
              {t(service.titleEN, service.titleHI)}
            </h1>
            <p className={`mt-0.5 text-sm font-medium ${service.colorClass}`}>
              {t(service.taglineEN, service.taglineHI)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 space-y-5">
        {/* Description */}
        <div className="card-elevated p-4">
          <p className="text-sm text-foreground leading-relaxed">
            {t(service.descEN, service.descHI)}
          </p>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="section-title text-base mb-3">
            {t("Key Benefits", "मुख्य लाभ")}
          </h2>
          <div className="card-elevated divide-y divide-border">
            {service.benefitsEN.map((benefit, index) => (
              <div key={benefit} className="flex items-start gap-3 p-3.5">
                <CheckCircle2
                  size={18}
                  className="flex-shrink-0 text-accent mt-0.5"
                />
                <span className="text-sm text-foreground leading-snug">
                  {t(service.benefitsEN[index], service.benefitsHI[index])}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advisor note */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <MessageCircle
              size={20}
              className="flex-shrink-0 text-primary mt-0.5"
            />
            <p className="text-sm text-foreground leading-relaxed">
              {t(
                "Our advisors provide completely free consultations with no obligation. We help you compare plans from top insurers and financial institutions.",
                "हमारे सलाहकार बिल्कुल मुफ्त और बिना किसी बाध्यता के परामर्श देते हैं। हम आपको शीर्ष बीमाकर्ताओं और वित्तीय संस्थाओं की योजनाओं की तुलना करने में मदद करते हैं।",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-3 bg-background/95 backdrop-blur-sm border-t border-border pt-3">
        <button
          type="button"
          data-ocid="service-detail-get-in-touch"
          onClick={handleGetInTouch}
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
        >
          {t(
            `Get In Touch – ${service.titleEN}`,
            `संपर्क करें – ${service.titleHI}`,
          )}
        </button>
      </div>
    </div>
  );
}
