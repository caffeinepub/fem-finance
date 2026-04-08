import { useLanguage } from "@/hooks/useLanguage";

export function Services() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-6">
      <h1 className="font-display font-bold text-2xl text-foreground">
        {t("Our Services", "हमारी सेवाएं")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t("Insurance, Investments & more.", "बीमा, निवेश और भी बहुत कुछ।")}
      </p>
    </div>
  );
}
