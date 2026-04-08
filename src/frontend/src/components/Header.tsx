import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/types";

export function Header() {
  const { lang, setLang } = useLanguage();

  const toggleLang = (selected: Language) => setLang(selected);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-sm"
      style={{ maxWidth: "768px", margin: "0 auto" }}
    >
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-foreground/20">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
              aria-hidden="true"
            >
              <title>FEM Logo</title>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-lg text-primary-foreground leading-none">
              FEM
            </span>
            <p className="text-primary-foreground/70 text-[10px] leading-none mt-0.5">
              Future Expense Manager
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <fieldset
          className="flex items-center rounded-md border border-primary-foreground/40 overflow-hidden"
          data-ocid="lang-toggle"
        >
          <legend className="sr-only">Language selector</legend>
          <button
            type="button"
            onClick={() => toggleLang("EN")}
            className={`px-3 h-8 text-sm font-semibold transition-smooth ${
              lang === "EN"
                ? "bg-primary-foreground text-primary"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            }`}
            aria-pressed={lang === "EN"}
            data-ocid="lang-en"
          >
            EN
          </button>
          <div
            className="w-px h-4 bg-primary-foreground/40"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => toggleLang("HI")}
            className={`px-3 h-8 text-sm font-semibold transition-smooth ${
              lang === "HI"
                ? "bg-primary-foreground text-primary"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            }`}
            aria-pressed={lang === "HI"}
            data-ocid="lang-hi"
          >
            HI
          </button>
        </fieldset>
      </div>
    </header>
  );
}
