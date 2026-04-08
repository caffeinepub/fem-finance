import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Heart,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  titleEN: string;
  titleHI: string;
  descEN: string;
  descHI: string;
}

const SERVICES: Service[] = [
  {
    id: "life-insurance",
    icon: <ShieldCheck size={28} strokeWidth={1.8} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    titleEN: "Life Insurance",
    titleHI: "जीवन बीमा",
    descEN: "Secure your family's future with comprehensive life cover.",
    descHI: "व्यापक जीवन बीमा से अपने परिवार का भविष्य सुरक्षित करें।",
  },
  {
    id: "health-insurance",
    icon: <Heart size={28} strokeWidth={1.8} />,
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    titleEN: "Health Insurance",
    titleHI: "स्वास्थ्य बीमा",
    descEN: "Stay protected from medical expenses with cashless coverage.",
    descHI: "कैशलेस कवरेज से चिकित्सा खर्चों से सुरक्षित रहें।",
  },
  {
    id: "mutual-funds",
    icon: <TrendingUp size={28} strokeWidth={1.8} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    titleEN: "Mutual Funds",
    titleHI: "म्यूचुअल फंड",
    descEN: "Grow your wealth with expertly managed investment portfolios.",
    descHI: "विशेषज्ञ प्रबंधित निवेश पोर्टफोलियो से अपनी संपत्ति बढ़ाएं।",
  },
  {
    id: "loan-services",
    icon: <Wallet size={28} strokeWidth={1.8} />,
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    titleEN: "Loan Services",
    titleHI: "ऋण सेवाएं",
    descEN: "Quick and hassle-free loans tailored to your financial needs.",
    descHI: "आपकी वित्तीय जरूरतों के लिए त्वरित और आसान ऋण।",
  },
];

export function ServicesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 pb-24 space-y-5">
      {/* Header */}
      <div>
        <h1 className="section-title text-2xl">
          {t("Our Services", "हमारी सेवाएं")}
        </h1>
        <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
          {t(
            "Choose the right financial plan for you and your family.",
            "अपने और अपने परिवार के लिए सही वित्तीय योजना चुनें।",
          )}
        </p>
      </div>

      {/* Service Cards */}
      <div className="space-y-3">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            type="button"
            data-ocid={`service-card-${service.id}`}
            onClick={() =>
              navigate({
                to: "/services/$serviceId",
                params: { serviceId: service.id },
              })
            }
            className="w-full card-elevated p-4 flex items-center gap-4 text-left hover:shadow-md active:scale-[0.99] transition-smooth touch-target"
            aria-label={t(service.titleEN, service.titleHI)}
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${service.bgClass} ${service.colorClass}`}
            >
              {service.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-base text-foreground leading-tight">
                {t(service.titleEN, service.titleHI)}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground leading-snug line-clamp-2">
                {t(service.descEN, service.descHI)}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-muted-foreground"
            />
          </button>
        ))}
      </div>

      {/* Bottom promo card */}
      <div className="card-elevated p-5 bg-primary text-primary-foreground rounded-2xl border-0">
        <p className="font-display font-bold text-base">
          {t("Not sure where to start?", "शुरुआत कहाँ से करें?")}
        </p>
        <p className="mt-1 text-sm opacity-80 leading-relaxed">
          {t(
            "Talk to our expert advisor — free consultation for new customers.",
            "हमारे विशेषज्ञ सलाहकार से बात करें — नए ग्राहकों के लिए मुफ्त परामर्श।",
          )}
        </p>
        <button
          type="button"
          data-ocid="services-free-consult-cta"
          onClick={() => navigate({ to: "/" })}
          className="mt-3 px-4 py-2 bg-primary-foreground text-primary rounded-xl text-sm font-semibold touch-target transition-smooth hover:opacity-90 active:scale-[0.98]"
        >
          {t("Request Free Callback", "मुफ्त कॉलबैक के लिए अनुरोध करें")}
        </button>
      </div>
    </div>
  );
}
