import { useLanguage } from "@/hooks/useLanguage";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";

type Category = "Insurance" | "Investment" | "Tax Saving";

interface Article {
  id: string;
  category: Category;
  titleEn: string;
  titleHi: string;
  previewEn: string;
  previewHi: string;
  readTime: number;
  icon: React.ReactNode;
  bodyEn: string[];
  bodyHi: string[];
}

function RichLine({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={part}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={`plain-${part}`}>{part}</span>
        ),
      )}
    </span>
  );
}

const ARTICLES: Article[] = [
  {
    id: "insurance-importance",
    category: "Insurance",
    titleEn: "Importance of Insurance",
    titleHi: "बीमा का महत्व",
    previewEn: "Why every Indian family must have insurance coverage.",
    previewHi: "हर भारतीय परिवार को बीमा क्यों लेना चाहिए।",
    readTime: 3,
    icon: <Shield className="w-5 h-5" />,
    bodyEn: [
      "Insurance is a financial safety net that protects you and your family from unexpected life events. In India, where medical emergencies can wipe out years of savings in a single day, having insurance is not a luxury — it is a necessity.",
      "Life insurance ensures that if something happens to the earning member of a family, the dependents are not left financially helpless. A ₹50 lakh term plan costs as little as ₹500–₹700 per month for a 30-year-old.",
      "Health insurance is equally important. Hospital bills in private hospitals can easily run into lakhs of rupees. A family floater health plan covers your entire family for ₹10,000–₹20,000 per year.",
      "Many Indian families delay buying insurance thinking it is expensive or unnecessary. But the younger you are when you buy insurance, the cheaper the premium.",
      "Key types of insurance every family needs:",
      "• **Term Life Insurance** – High cover, low premium",
      "• **Health Insurance** – Covers hospitalization and treatment",
      "• **Vehicle Insurance** – Mandatory and essential",
      "Don't leave your family's future to chance. Start your insurance journey today.",
    ],
    bodyHi: [
      "बीमा एक वित्तीय सुरक्षा कवच है जो आपको और आपके परिवार को जीवन की अप्रत्याशित घटनाओं से बचाता है। भारत में, जहाँ चिकित्सा आपात स्थिति वर्षों की बचत को एक दिन में मिटा सकती है, बीमा होना एक विलासिता नहीं — एक आवश्यकता है।",
      "जीवन बीमा यह सुनिश्चित करता है कि यदि परिवार के कमाने वाले सदस्य के साथ कुछ हो जाए, तो आश्रित लोग आर्थिक रूप से असहाय न रहें। एक ₹50 लाख का टर्म प्लान 30 वर्षीय व्यक्ति के लिए केवल ₹500–₹700 प्रति माह में मिलता है।",
      "स्वास्थ्य बीमा भी उतना ही जरूरी है। निजी अस्पतालों में इलाज का खर्च आसानी से लाखों में पहुंच जाता है। एक फैमिली फ्लोटर हेल्थ प्लान पूरे परिवार को ₹10,000–₹20,000 प्रति वर्ष में कवर करता है।",
      "हर परिवार के लिए जरूरी बीमा के प्रकार:",
      "• **टर्म लाइफ बीमा** – अधिक कवरेज, कम प्रीमियम",
      "• **स्वास्थ्य बीमा** – अस्पताल में भर्ती और उपचार को कवर करता है",
      "• **वाहन बीमा** – अनिवार्य और आवश्यक",
      "अपने परिवार का भविष्य संयोग पर मत छोड़ें। आज ही अपनी बीमा यात्रा शुरू करें।",
    ],
  },
  {
    id: "sip-benefits",
    category: "Investment",
    titleEn: "SIP Benefits",
    titleHi: "SIP के फायदे",
    previewEn: "How a small monthly investment can build serious wealth.",
    previewHi: "छोटी मासिक बचत से कैसे बड़ी संपत्ति बनाएं।",
    readTime: 3,
    icon: <TrendingUp className="w-5 h-5" />,
    bodyEn: [
      "A Systematic Investment Plan (SIP) is one of the smartest ways to grow wealth in India. Instead of investing a large lump sum, you invest a fixed amount every month — as little as ₹500 — into a mutual fund.",
      "**Rupee Cost Averaging** – When markets are down, your fixed investment buys more units. When markets are up, you buy fewer. Over time, this averages your cost and reduces risk.",
      "**Compounding Magic** – If you invest ₹5,000 per month for 20 years at 12% annual return, your ₹12 lakh investment grows to approximately ₹50 lakhs.",
      "**Discipline Without Effort** – SIPs are auto-debited from your bank account, so you invest before you spend.",
      "**Flexibility** – You can start, stop, increase, or decrease your SIP at any time. No lock-in for most equity funds.",
      "**Tax Benefits** – Investing in ELSS mutual funds via SIP gives a deduction of up to ₹1.5 lakh under Section 80C.",
      "Starting a SIP at age 25 versus age 35 can make a difference of crores at retirement. The best time to start is today.",
    ],
    bodyHi: [
      "सिस्टेमेटिक इन्वेस्टमेंट प्लान (SIP) भारत में धन बढ़ाने के सबसे स्मार्ट तरीकों में से एक है। एक बड़ी रकम एकसाथ निवेश करने के बजाय, आप हर महीने एक तय राशि — केवल ₹500 से भी — म्यूचुअल फंड में निवेश करते हैं।",
      "**रुपी कॉस्ट एवरेजिंग** – जब बाजार नीचे होता है, तो आपका निश्चित निवेश अधिक यूनिट खरीदता है। समय के साथ यह आपकी लागत को औसत कर जोखिम कम करता है।",
      "**कंपाउंडिंग का जादू** – यदि आप 20 साल के लिए ₹5,000 प्रति माह 12% वार्षिक रिटर्न पर निवेश करते हैं, तो आपका ₹12 लाख का निवेश लगभग ₹50 लाख हो जाता है।",
      "**बिना प्रयास के अनुशासन** – SIP आपके बैंक खाते से अपने आप कट जाता है, इसलिए आप खर्च करने से पहले निवेश करते हैं।",
      "**लचीलापन** – आप किसी भी समय SIP शुरू, बंद, बढ़ा या घटा सकते हैं।",
      "**कर लाभ** – ELSS म्यूचुअल फंड में SIP के माध्यम से धारा 80C के तहत ₹1.5 लाख तक की कटौती मिलती है।",
      "25 साल में SIP शुरू करना और 35 साल में शुरू करना — रिटायरमेंट पर करोड़ों का फर्क हो सकता है।",
    ],
  },
  {
    id: "tax-saving",
    category: "Tax Saving",
    titleEn: "Tax Saving Tips",
    titleHi: "करों में बचत के उपाय",
    previewEn: "Use Section 80C and other tools to save lakhs in taxes.",
    previewHi: "धारा 80C और अन्य तरीकों से लाखों टैक्स बचाएं।",
    readTime: 4,
    icon: <Wallet className="w-5 h-5" />,
    bodyEn: [
      "Every year, millions of Indians pay more tax than they need to. With smart planning, you can legally save up to ₹2.5 lakh or more in taxes.",
      "**Section 80C – Up to ₹1.5 Lakh Deduction** — The most popular tax-saving section. Eligible investments include ELSS Mutual Funds, PPF, NSC, Life Insurance premiums, EPF contributions, and home loan principal repayment.",
      "• ELSS Mutual Funds (best returns + 3-year lock-in)",
      "• PPF – Public Provident Fund (government-backed, 15-year)",
      "• Life Insurance premiums & EPF contributions",
      "**Section 80D – Health Insurance Premium** — Deduction of up to ₹25,000 for yourself and family. For senior citizen parents, an additional ₹50,000 is available.",
      "**Section 24(b) – Home Loan Interest** — Deduction of up to ₹2 lakh on interest paid on a home loan.",
      "**NPS – Section 80CCD(1B)** — Additional ₹50,000 deduction by investing in National Pension System, over and above the 80C limit.",
      "**Pro Tip:** Don't wait until March to invest. Invest at the start of the financial year (April) to earn returns for the full year.",
    ],
    bodyHi: [
      "हर साल लाखों भारतीय जरूरत से ज्यादा टैक्स देते हैं। स्मार्ट प्लानिंग से आप कानूनी तौर पर ₹2.5 लाख या उससे अधिक टैक्स बचा सकते हैं।",
      "**धारा 80C – ₹1.5 लाख तक की कटौती** — सबसे लोकप्रिय टैक्स-बचत धारा। पात्र निवेश: ELSS म्यूचुअल फंड, PPF, NSC, जीवन बीमा प्रीमियम, EPF योगदान।",
      "• ELSS म्यूचुअल फंड (सर्वोत्तम रिटर्न + 3 साल की लॉक-इन)",
      "• PPF – पब्लिक प्रोविडेंट फंड (सरकार समर्थित, 15 साल)",
      "• जीवन बीमा प्रीमियम और EPF योगदान",
      "**धारा 80D – स्वास्थ्य बीमा प्रीमियम** — अपने और परिवार के लिए ₹25,000 तक की कटौती। वरिष्ठ नागरिक माता-पिता के लिए अतिरिक्त ₹50,000।",
      "**धारा 24(b) – होम लोन ब्याज** — होम लोन पर चुकाए गए ब्याज पर ₹2 लाख तक की कटौती।",
      "**NPS – धारा 80CCD(1B)** — नेशनल पेंशन सिस्टम में निवेश करके 80C की सीमा से अलग ₹50,000 की अतिरिक्त कटौती।",
      "**प्रो टिप:** निवेश के लिए मार्च तक इंतजार न करें। वित्तीय वर्ष की शुरुआत (अप्रैल) में निवेश करें।",
    ],
  },
  {
    id: "investment-basics",
    category: "Investment",
    titleEn: "Investment Basics",
    titleHi: "निवेश की बुनियाद",
    previewEn: "A beginner's guide to starting your investment journey.",
    previewHi: "निवेश की शुरुआत कैसे करें — शुरुआती गाइड।",
    readTime: 3,
    icon: <BookOpen className="w-5 h-5" />,
    bodyEn: [
      "Starting your investment journey can feel overwhelming. With so many options — stocks, mutual funds, gold, real estate — where do you even begin? Here is a simple framework for first-time investors in India.",
      "**Step 1: Build an Emergency Fund First** — Keep 3–6 months of expenses in a savings account before investing. This prevents you from withdrawing investments during emergencies.",
      "**Step 2: Get Insured** — Investment without insurance is like a car without brakes. Make sure you have adequate life and health insurance first.",
      "**Step 3: Start with Mutual Funds** — A diversified equity fund managed by professionals is far safer than picking individual stocks.",
      "**Step 4: Know Your Risk Tolerance:**",
      "• **Conservative:** FD, PPF, Debt Funds",
      "• **Moderate:** Balanced/Hybrid Funds",
      "• **Aggressive:** Equity Funds, Stocks",
      "**Step 5: The Power of Time** — ₹1,000/month from age 25 at 12% = ₹35 lakhs at 60. From age 35 = only ₹10 lakhs. Starting early makes a 3.5x difference.",
      "**Golden Rules:** Diversify across asset classes. Review portfolio annually. Don't panic during market falls — stay invested.",
    ],
    bodyHi: [
      "निवेश की यात्रा शुरू करना भारी लग सकता है। स्टॉक, म्यूचुअल फंड, सोना, रियल एस्टेट — इतने विकल्पों के साथ शुरुआत कहाँ से करें?",
      "**चरण 1: पहले आपातकालीन फंड बनाएं** — निवेश करने से पहले बचत खाते में 3–6 महीने के खर्च रखें।",
      "**चरण 2: बीमा लें** — बीमा के बिना निवेश ब्रेक के बिना कार की तरह है। पहले पर्याप्त जीवन और स्वास्थ्य बीमा सुनिश्चित करें।",
      "**चरण 3: म्यूचुअल फंड से शुरुआत करें** — पेशेवरों द्वारा प्रबंधित विविध इक्विटी फंड व्यक्तिगत स्टॉक चुनने से कहीं अधिक सुरक्षित है।",
      "**चरण 4: अपनी जोखिम क्षमता जानें:**",
      "• **रूढ़िवादी:** FD, PPF, डेट फंड",
      "• **मध्यम:** बैलेंस्ड/हाइब्रिड फंड",
      "• **आक्रामक:** इक्विटी फंड, स्टॉक",
      "**चरण 5: समय की शक्ति** — 25 साल की उम्र से ₹1,000/माह = 60 साल पर ₹35 लाख। 35 साल की उम्र से = ₹10 लाख। जल्दी शुरू करना 3.5 गुना फर्क करता है।",
      "**सुनहरे नियम:** विविधता लाएं। साल में एक बार समीक्षा करें। बाजार गिरने पर घबराएं नहीं — निवेशित रहें।",
    ],
  },
];

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  Insurance: { bg: "bg-primary/10", text: "text-primary" },
  Investment: { bg: "bg-accent/10", text: "text-accent" },
  "Tax Saving": { bg: "bg-secondary", text: "text-secondary-foreground" },
};

function BodyLine({
  line,
  categoryStyle,
}: {
  line: string;
  categoryStyle: { bg: string; text: string };
}) {
  if (line.startsWith("• ")) {
    return (
      <div className="flex gap-2 items-start py-0.5">
        <span
          className={`mt-0.5 ${categoryStyle.text} font-bold shrink-0 text-sm`}
        >
          •
        </span>
        <RichLine
          text={line.replace(/^•\s*/, "")}
          className="text-sm text-foreground leading-relaxed"
        />
      </div>
    );
  }
  return (
    <p className="text-sm text-foreground leading-relaxed">
      <RichLine text={line} />
    </p>
  );
}

function ArticleCard({
  article,
  lang,
  onClick,
}: {
  article: Article;
  lang: "EN" | "HI";
  onClick: () => void;
}) {
  const title = lang === "HI" ? article.titleHi : article.titleEn;
  const preview = lang === "HI" ? article.previewHi : article.previewEn;
  const style = CATEGORY_STYLES[article.category];

  return (
    <button
      type="button"
      data-ocid={`article-card-${article.id}`}
      onClick={onClick}
      className="card-elevated w-full text-left p-4 touch-target flex gap-3 items-start hover:shadow-md active:scale-[0.98] transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-xl ${style.bg} ${style.text} flex items-center justify-center`}
      >
        {article.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
          >
            {article.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </span>
        </div>
        <h3 className="font-display font-bold text-base text-foreground leading-snug truncate">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
          {preview}
        </p>
      </div>
    </button>
  );
}

function ArticleDetail({
  article,
  lang,
  onBack,
}: {
  article: Article;
  lang: "EN" | "HI";
  onBack: () => void;
}) {
  const title = lang === "HI" ? article.titleHi : article.titleEn;
  const body = lang === "HI" ? article.bodyHi : article.bodyEn;
  const style = CATEGORY_STYLES[article.category];

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border sticky top-0 z-10">
        <button
          type="button"
          data-ocid="article-back-btn"
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted active:scale-95 transition-smooth touch-target"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} shrink-0`}
          >
            {article.category}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {article.readTime} min read
          </span>
        </div>
      </div>

      <div className="px-4 py-6 flex-1">
        <h1 className="font-display font-bold text-2xl text-foreground leading-tight mb-4">
          {title}
        </h1>

        <div className="space-y-3">
          {body.map((line) => (
            <BodyLine
              key={line.slice(0, 40)}
              line={line}
              categoryStyle={style}
            />
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm font-semibold text-primary mb-1">
            {lang === "HI" ? "विशेषज्ञ सलाह लें" : "Get Expert Advice"}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {lang === "HI"
              ? "हमारे वित्तीय सलाहकार से निःशुल्क परामर्श करें।"
              : "Talk to our financial advisor for a free consultation."}
          </p>
          <a
            href="https://wa.me/919027933533?text=Hello%2C%20I%20want%20financial%20advice."
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="article-whatsapp-cta"
            className="inline-flex items-center gap-2 btn-primary px-4 py-2 text-sm"
          >
            {lang === "HI" ? "अभी WhatsApp करें" : "WhatsApp Now"}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const { lang, t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const selectedArticle = selectedId
    ? (ARTICLES.find((a) => a.id === selectedId) ?? null)
    : null;

  const categories: (Category | "All")[] = [
    "All",
    "Insurance",
    "Investment",
    "Tax Saving",
  ];

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        lang={lang}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="font-display font-bold text-2xl text-foreground">
        {t("Financial Education", "वित्तीय शिक्षा")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t(
          "Learn about insurance, investment & tax saving.",
          "बीमा, निवेश और कर बचत के बारे में जानें।",
        )}
      </p>

      <div
        data-ocid="education-category-filter"
        className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid={`filter-${cat.toLowerCase().replace(" ", "-")}`}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth touch-target flex items-center ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/50"
            }`}
          >
            {cat === "All" ? t("All", "सभी") : cat}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        {filtered.length} {t("articles", "लेख")}
      </p>

      <div
        data-ocid="education-article-list"
        className="mt-3 flex flex-col gap-3"
      >
        {filtered.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            lang={lang}
            onClick={() => setSelectedId(article.id)}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed pb-4">
        {t(
          "Content is for educational purposes only. Consult a financial advisor before investing.",
          "यह सामग्री केवल शैक्षणिक उद्देश्यों के लिए है। निवेश से पहले वित्तीय सलाहकार से परामर्श करें।",
        )}
      </p>
    </div>
  );
}
