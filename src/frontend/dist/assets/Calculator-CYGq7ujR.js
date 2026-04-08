import { u as useLanguage, r as reactExports, j as jsxRuntimeExports } from "./index-D9xHnWj1.js";
function formatIndian(amount) {
  if (amount >= 1e7) {
    return `₹${(amount / 1e7).toFixed(2)} Cr`;
  }
  if (amount >= 1e5) {
    return `₹${(amount / 1e5).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
function formatIndianHi(amount) {
  if (amount >= 1e7) {
    return `₹${(amount / 1e7).toFixed(2)} करोड़`;
  }
  if (amount >= 1e5) {
    return `₹${(amount / 1e5).toFixed(2)} लाख`;
  }
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
function SliderField({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
  ocid
}) {
  const pct = (value - min) / (max - min) * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg", children: displayValue })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[44px] flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value)),
        className: "w-full h-2 appearance-none rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring",
        style: {
          background: `linear-gradient(to right, oklch(var(--primary)) ${pct}%, oklch(var(--border)) ${pct}%)`
        },
        "data-ocid": ocid
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: min }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: max })
    ] })
  ] });
}
function ResultCard({ label, value, variant }) {
  const styles = {
    blue: "bg-primary/10 border-primary/20 text-primary",
    green: "bg-accent/10 border-accent/20 text-accent",
    highlight: "bg-gradient-to-br from-primary to-accent border-transparent text-primary-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-2xl border p-4 flex flex-col gap-1 ${styles[variant]}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs font-medium uppercase tracking-wide ${variant === "highlight" ? "text-primary-foreground/80" : "opacity-70"}`,
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xl font-bold font-display leading-tight ${variant === "highlight" ? "text-primary-foreground" : ""}`,
            children: value
          }
        )
      ]
    }
  );
}
function DonutChart({ invested, returns }) {
  const total = invested + returns;
  if (total === 0) return null;
  const radius = 48;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;
  const investedPct = invested / total;
  const returnsPct = returns / total;
  const investedArc = investedPct * circumference;
  const returnsArc = returnsPct * circumference;
  const gap = 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "120", height: "120", viewBox: "0 0 120 120", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx,
        cy,
        r: radius,
        fill: "none",
        stroke: "oklch(var(--accent))",
        strokeWidth: "14",
        strokeDasharray: `${returnsArc - gap} ${circumference - returnsArc + gap}`,
        strokeDashoffset: -(investedArc + gap / 2 - circumference / 4),
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx,
        cy,
        r: radius,
        fill: "none",
        stroke: "oklch(var(--primary))",
        strokeWidth: "14",
        strokeDasharray: `${investedArc - gap} ${circumference - investedArc + gap}`,
        strokeDashoffset: circumference / 4,
        strokeLinecap: "round"
      }
    )
  ] });
}
function Calculator() {
  const { t, lang } = useLanguage();
  const [monthly, setMonthly] = reactExports.useState(5e3);
  const [years, setYears] = reactExports.useState(10);
  const [rate, setRate] = reactExports.useState(12);
  const [monthlyInput, setMonthlyInput] = reactExports.useState("5000");
  const { totalInvested, totalValue, estimatedReturns } = reactExports.useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const inv = monthly * n;
    const val = r === 0 ? inv : monthly * (((1 + r) ** n - 1) / r) * (1 + r);
    const ret = val - inv;
    return {
      totalInvested: Math.round(inv),
      totalValue: Math.round(val),
      estimatedReturns: Math.round(ret)
    };
  }, [monthly, years, rate]);
  const fmt = lang === "HI" ? formatIndianHi : formatIndian;
  const handleMonthlyChange = (raw) => {
    setMonthlyInput(raw);
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed >= 100 && parsed <= 1e5) {
      setMonthly(parsed);
    }
  };
  const handleMonthlyBlur = () => {
    const parsed = Number.parseInt(monthlyInput, 10);
    if (Number.isNaN(parsed) || parsed < 100) {
      setMonthly(100);
      setMonthlyInput("100");
    } else if (parsed > 1e5) {
      setMonthly(1e5);
      setMonthlyInput("100000");
    } else {
      setMonthly(parsed);
      setMonthlyInput(String(parsed));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 space-y-5 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: t("SIP Calculator", "SIP कैलकुलेटर") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t(
        "Plan your monthly investments and see them grow.",
        "अपने मासिक निवेश की योजना बनाएं और उन्हें बढ़ते देखें।"
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "monthly-input",
            className: "block text-sm font-medium text-foreground",
            children: t("Monthly Investment (₹)", "मासिक निवेश (₹)")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-base pointer-events-none", children: "₹" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "monthly-input",
              type: "number",
              min: 100,
              max: 1e5,
              step: 100,
              value: monthlyInput,
              onChange: (e) => handleMonthlyChange(e.target.value),
              onBlur: handleMonthlyBlur,
              className: "input-field pl-8",
              inputMode: "numeric",
              "data-ocid": "monthly-investment-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹1,00,000" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderField,
        {
          label: t("Time Period", "समय अवधि"),
          value: years,
          min: 1,
          max: 30,
          step: 1,
          displayValue: t(`${years} Yrs`, `${years} वर्ष`),
          onChange: setYears,
          ocid: "time-period-slider"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SliderField,
        {
          label: t("Expected Return", "अपेक्षित रिटर्न"),
          value: rate,
          min: 1,
          max: 20,
          step: 0.5,
          displayValue: `${rate}%`,
          onChange: setRate,
          ocid: "expected-return-slider"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: t("Your Estimate", "आपका अनुमान") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultCard,
          {
            label: t("Total Invested", "कुल निवेश"),
            value: fmt(totalInvested),
            variant: "blue"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultCard,
          {
            label: t("Est. Returns", "अनुमानित रिटर्न"),
            value: fmt(estimatedReturns),
            variant: "green"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResultCard,
        {
          label: t("Total Value", "कुल मूल्य"),
          value: fmt(totalValue),
          variant: "highlight"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-4", children: t("Investment Breakdown", "निवेश विवरण") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DonutChart, { invested: totalInvested, returns: estimatedReturns }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Invested", "निवेशित") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: fmt(totalInvested) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-accent flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Returns", "रिटर्न") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: fmt(estimatedReturns) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Wealth Gain", "धन वृद्धि") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-accent", children: totalInvested > 0 ? `${((totalValue - totalInvested) / totalInvested * 100).toFixed(1)}%` : "0%" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://wa.me/919027933533?text=Hello%2C%20I%20want%20financial%20advice.",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "btn-success flex items-center justify-center gap-2 w-full py-4 text-base",
        "data-ocid": "calculator-cta",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
            }
          ),
          t("Get Free Investment Advice", "मुफ़्त निवेश सलाह पाएं")
        ]
      }
    )
  ] });
}
export {
  Calculator
};
