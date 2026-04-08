import { c as createLucideIcon, u as useLanguage, r as reactExports, j as jsxRuntimeExports } from "./index-D9xHnWj1.js";
import { u as useBackend } from "./useBackend-dezEtLoM.js";
import { T as TrendingUp } from "./trending-up-DN76znz2.js";
import { S as Shield } from "./shield-Cucse52H.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const STATS = [
  {
    icon: Users,
    valueEN: "500+",
    labelEN: "Happy Clients",
    labelHI: "खुश ग्राहक"
  },
  {
    icon: TrendingUp,
    valueEN: "10+",
    labelEN: "Years Experience",
    labelHI: "वर्ष का अनुभव"
  },
  { icon: Shield, valueEN: "4", labelEN: "Core Services", labelHI: "मुख्य सेवाएं" }
];
const EMPTY_FORM = { name: "", phone: "", city: "" };
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Required";
  if (!form.phone.trim()) errors.phone = "Required";
  else if (!/^\d{10}$/.test(form.phone.trim()))
    errors.phone = "Must be 10 digits";
  if (!form.city.trim()) errors.city = "Required";
  return errors;
}
function Home() {
  const { t } = useLanguage();
  const { submitLead, isReady } = useBackend();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  };
  const handleSubmit = async (e) => {
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
      city: form.city.trim()
    });
    setSubmitting(false);
    setSuccess(true);
    setForm(EMPTY_FORM);
    setErrors({});
    setTimeout(() => setSuccess(false), 3e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-primary px-5 pt-7 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm font-body mb-1", children: t("FEM — Future Expense Manager", "FEM — फ्यूचर एक्सपेंस मैनेजर") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl leading-snug text-primary-foreground mb-3", children: t("Get Free Financial\nConsultation", "मुफ्त वित्तीय\nपरामर्श पाएं") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/85 text-sm leading-relaxed max-w-xs", children: t(
        "Expert guidance on insurance, mutual funds, and loan planning for your family.",
        "आपके परिवार के लिए बीमा, म्यूचुअल फंड और लोन प्लानिंग पर विशेषज्ञ मार्गदर्शन।"
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary/90 px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: STATS.map(({ icon: Icon, valueEN, labelEN, labelHI }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center bg-primary-foreground/10 rounded-xl py-3 px-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary-foreground/80 mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-primary-foreground leading-none", children: valueEN }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/75 text-[11px] text-center mt-0.5 leading-tight", children: t(labelEN, labelHI) })
        ]
      },
      labelEN
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-background px-5 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: t("Request a Callback", "कॉलबैक का अनुरोध करें") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: t(
        "Fill in your details and we'll reach out shortly.",
        "अपनी जानकारी भरें, हम जल्द संपर्क करेंगे।"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          noValidate: true,
          className: "flex flex-col gap-4",
          "data-ocid": "lead-form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lead-name",
                  className: "text-sm font-medium text-foreground",
                  children: t("Name", "नाम")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "lead-name",
                  type: "text",
                  inputMode: "text",
                  autoComplete: "name",
                  placeholder: t("Enter your name", "अपना नाम दर्ज करें"),
                  value: form.name,
                  onChange: (e) => handleChange("name", e.target.value),
                  className: `input-field ${errors.name ? "border-destructive ring-destructive/30 focus:ring-destructive/50" : ""}`,
                  "data-ocid": "lead-name-input",
                  "aria-invalid": !!errors.name,
                  "aria-describedby": errors.name ? "lead-name-error" : void 0
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "lead-name-error", className: "text-destructive text-xs", children: t(errors.name, "आवश्यक है") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lead-phone",
                  className: "text-sm font-medium text-foreground",
                  children: t("Phone Number", "फोन नंबर")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "lead-phone",
                  type: "tel",
                  inputMode: "numeric",
                  autoComplete: "tel",
                  maxLength: 10,
                  placeholder: t("10-digit mobile number", "10 अंकों का मोबाइल नंबर"),
                  value: form.phone,
                  onChange: (e) => handleChange("phone", e.target.value.replace(/\D/g, "")),
                  className: `input-field ${errors.phone ? "border-destructive ring-destructive/30 focus:ring-destructive/50" : ""}`,
                  "data-ocid": "lead-phone-input",
                  "aria-invalid": !!errors.phone,
                  "aria-describedby": errors.phone ? "lead-phone-error" : void 0
                }
              ),
              errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "lead-phone-error", className: "text-destructive text-xs", children: t(
                errors.phone,
                errors.phone === "Required" ? "आवश्यक है" : "10 अंक होने चाहिए"
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lead-city",
                  className: "text-sm font-medium text-foreground",
                  children: t("City", "शहर")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "lead-city",
                  type: "text",
                  inputMode: "text",
                  autoComplete: "address-level2",
                  placeholder: t("Your city", "आपका शहर"),
                  value: form.city,
                  onChange: (e) => handleChange("city", e.target.value),
                  className: `input-field ${errors.city ? "border-destructive ring-destructive/30 focus:ring-destructive/50" : ""}`,
                  "data-ocid": "lead-city-input",
                  "aria-invalid": !!errors.city,
                  "aria-describedby": errors.city ? "lead-city-error" : void 0
                }
              ),
              errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "lead-city-error", className: "text-destructive text-xs", children: t(errors.city, "आवश्यक है") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: submitting || !isReady,
                className: "btn-primary w-full text-base px-6 py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                "data-ocid": "lead-submit-btn",
                children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                  t("Submitting…", "भेज रहे हैं…")
                ] }) : t("Request Callback", "कॉलबैक का अनुरोध करें")
              }
            ),
            success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "output",
              {
                className: "flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/30 px-4 py-3 text-accent text-sm font-medium",
                "aria-live": "polite",
                "data-ocid": "lead-success-msg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
                  t(
                    "Thank you! We will contact you soon.",
                    "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।"
                  )
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-muted/40 px-5 py-6 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-4", children: t("Why Families Trust Us", "परिवार हम पर क्यों भरोसा करते हैं") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [
        {
          en: "Certified financial advisors with 10+ years of hands-on experience.",
          hi: "10+ वर्षों के अनुभव वाले प्रमाणित वित्तीय सलाहकार।"
        },
        {
          en: "Personalized plans tailored to your income, goals, and family needs.",
          hi: "आपकी आय, लक्ष्यों और परिवार की जरूरतों के अनुसार व्यक्तिगत योजनाएं।"
        },
        {
          en: "End-to-end support — from planning to policy renewal and beyond.",
          hi: "योजना से लेकर पॉलिसी नवीनीकरण तक पूर्ण सहायता।"
        }
      ].map(({ en, hi }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: t(en, hi) })
      ] }, en)) })
    ] })
  ] });
}
export {
  Home
};
