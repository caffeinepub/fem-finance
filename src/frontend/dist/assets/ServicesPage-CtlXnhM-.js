import { c as createLucideIcon, u as useLanguage, a as useNavigate, j as jsxRuntimeExports } from "./index-D9xHnWj1.js";
import { S as ShieldCheck, H as Heart } from "./shield-check-dS4Qc-xf.js";
import { T as TrendingUp } from "./trending-up-DN76znz2.js";
import { W as Wallet } from "./wallet-C5bz1lUh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const SERVICES = [
  {
    id: "life-insurance",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 28, strokeWidth: 1.8 }),
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    titleEN: "Life Insurance",
    titleHI: "जीवन बीमा",
    descEN: "Secure your family's future with comprehensive life cover.",
    descHI: "व्यापक जीवन बीमा से अपने परिवार का भविष्य सुरक्षित करें।"
  },
  {
    id: "health-insurance",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 28, strokeWidth: 1.8 }),
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    titleEN: "Health Insurance",
    titleHI: "स्वास्थ्य बीमा",
    descEN: "Stay protected from medical expenses with cashless coverage.",
    descHI: "कैशलेस कवरेज से चिकित्सा खर्चों से सुरक्षित रहें।"
  },
  {
    id: "mutual-funds",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 28, strokeWidth: 1.8 }),
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    titleEN: "Mutual Funds",
    titleHI: "म्यूचुअल फंड",
    descEN: "Grow your wealth with expertly managed investment portfolios.",
    descHI: "विशेषज्ञ प्रबंधित निवेश पोर्टफोलियो से अपनी संपत्ति बढ़ाएं।"
  },
  {
    id: "loan-services",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 28, strokeWidth: 1.8 }),
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    titleEN: "Loan Services",
    titleHI: "ऋण सेवाएं",
    descEN: "Quick and hassle-free loans tailored to your financial needs.",
    descHI: "आपकी वित्तीय जरूरतों के लिए त्वरित और आसान ऋण।"
  }
];
function ServicesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 pb-24 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title text-2xl", children: t("Our Services", "हमारी सेवाएं") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-sm leading-relaxed", children: t(
        "Choose the right financial plan for you and your family.",
        "अपने और अपने परिवार के लिए सही वित्तीय योजना चुनें।"
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SERVICES.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `service-card-${service.id}`,
        onClick: () => navigate({
          to: "/services/$serviceId",
          params: { serviceId: service.id }
        }),
        className: "w-full card-elevated p-4 flex items-center gap-4 text-left hover:shadow-md active:scale-[0.99] transition-smooth touch-target",
        "aria-label": t(service.titleEN, service.titleHI),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${service.bgClass} ${service.colorClass}`,
              children: service.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground leading-tight", children: t(service.titleEN, service.titleHI) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground leading-snug line-clamp-2", children: t(service.descEN, service.descHI) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              size: 20,
              className: "flex-shrink-0 text-muted-foreground"
            }
          )
        ]
      },
      service.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 bg-primary text-primary-foreground rounded-2xl border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base", children: t("Not sure where to start?", "शुरुआत कहाँ से करें?") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm opacity-80 leading-relaxed", children: t(
        "Talk to our expert advisor — free consultation for new customers.",
        "हमारे विशेषज्ञ सलाहकार से बात करें — नए ग्राहकों के लिए मुफ्त परामर्श।"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "services-free-consult-cta",
          onClick: () => navigate({ to: "/" }),
          className: "mt-3 px-4 py-2 bg-primary-foreground text-primary rounded-xl text-sm font-semibold touch-target transition-smooth hover:opacity-90 active:scale-[0.98]",
          children: t("Request Free Callback", "मुफ्त कॉलबैक के लिए अनुरोध करें")
        }
      )
    ] })
  ] });
}
export {
  ServicesPage
};
