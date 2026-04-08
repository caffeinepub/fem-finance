import { useLanguage } from "@/hooks/useLanguage";
import { useMemo, useState } from "react";

// ─── Indian number formatting ──────────────────────────────────────────────
function formatIndian(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function formatIndianHi(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)} करोड़`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2)} लाख`;
  }
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

// ─── Slider with label ─────────────────────────────────────────────────────
interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
  ocid: string;
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
  ocid,
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
          {displayValue}
        </span>
      </div>
      <div className="relative h-[44px] flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
          style={{
            background: `linear-gradient(to right, oklch(var(--primary)) ${pct}%, oklch(var(--border)) ${pct}%)`,
          }}
          data-ocid={ocid}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ─── Result card ───────────────────────────────────────────────────────────
interface ResultCardProps {
  label: string;
  value: string;
  variant: "blue" | "green" | "highlight";
}

function ResultCard({ label, value, variant }: ResultCardProps) {
  const styles = {
    blue: "bg-primary/10 border-primary/20 text-primary",
    green: "bg-accent/10 border-accent/20 text-accent",
    highlight:
      "bg-gradient-to-br from-primary to-accent border-transparent text-primary-foreground",
  } as const;

  return (
    <div
      className={`rounded-2xl border p-4 flex flex-col gap-1 ${styles[variant]}`}
    >
      <span
        className={`text-xs font-medium uppercase tracking-wide ${
          variant === "highlight" ? "text-primary-foreground/80" : "opacity-70"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-xl font-bold font-display leading-tight ${
          variant === "highlight" ? "text-primary-foreground" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Donut chart (pure SVG) ────────────────────────────────────────────────
interface DonutChartProps {
  invested: number;
  returns: number;
}

function DonutChart({ invested, returns }: DonutChartProps) {
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

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
      {/* Returns arc (green) — start at top (-90deg) + investedArc */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="oklch(var(--accent))"
        strokeWidth="14"
        strokeDasharray={`${returnsArc - gap} ${circumference - returnsArc + gap}`}
        strokeDashoffset={-(investedArc + gap / 2 - circumference / 4)}
        strokeLinecap="round"
      />
      {/* Invested arc (blue) — start at top */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="oklch(var(--primary))"
        strokeWidth="14"
        strokeDasharray={`${investedArc - gap} ${circumference - investedArc + gap}`}
        strokeDashoffset={circumference / 4}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export function Calculator() {
  const { t, lang } = useLanguage();

  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [monthlyInput, setMonthlyInput] = useState("5000");

  const { totalInvested, totalValue, estimatedReturns } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const inv = monthly * n;
    const val = r === 0 ? inv : monthly * (((1 + r) ** n - 1) / r) * (1 + r);
    const ret = val - inv;
    return {
      totalInvested: Math.round(inv),
      totalValue: Math.round(val),
      estimatedReturns: Math.round(ret),
    };
  }, [monthly, years, rate]);

  const fmt = lang === "HI" ? formatIndianHi : formatIndian;

  const handleMonthlyChange = (raw: string) => {
    setMonthlyInput(raw);
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed >= 100 && parsed <= 100000) {
      setMonthly(parsed);
    }
  };

  const handleMonthlyBlur = () => {
    const parsed = Number.parseInt(monthlyInput, 10);
    if (Number.isNaN(parsed) || parsed < 100) {
      setMonthly(100);
      setMonthlyInput("100");
    } else if (parsed > 100000) {
      setMonthly(100000);
      setMonthlyInput("100000");
    } else {
      setMonthly(parsed);
      setMonthlyInput(String(parsed));
    }
  };

  return (
    <div className="px-4 py-6 space-y-5 pb-8">
      {/* Page header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          {t("SIP Calculator", "SIP कैलकुलेटर")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Plan your monthly investments and see them grow.",
            "अपने मासिक निवेश की योजना बनाएं और उन्हें बढ़ते देखें।",
          )}
        </p>
      </div>

      {/* Input card */}
      <div className="card-elevated p-5 space-y-6">
        {/* Monthly Investment — number input */}
        <div className="space-y-2">
          <label
            htmlFor="monthly-input"
            className="block text-sm font-medium text-foreground"
          >
            {t("Monthly Investment (₹)", "मासिक निवेश (₹)")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-base pointer-events-none">
              ₹
            </span>
            <input
              id="monthly-input"
              type="number"
              min={100}
              max={100000}
              step={100}
              value={monthlyInput}
              onChange={(e) => handleMonthlyChange(e.target.value)}
              onBlur={handleMonthlyBlur}
              className="input-field pl-8"
              inputMode="numeric"
              data-ocid="monthly-investment-input"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹100</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        {/* Time Period slider */}
        <SliderField
          label={t("Time Period", "समय अवधि")}
          value={years}
          min={1}
          max={30}
          step={1}
          displayValue={t(`${years} Yrs`, `${years} वर्ष`)}
          onChange={setYears}
          ocid="time-period-slider"
        />

        {/* Expected Return slider */}
        <SliderField
          label={t("Expected Return", "अपेक्षित रिटर्न")}
          value={rate}
          min={1}
          max={20}
          step={0.5}
          displayValue={`${rate}%`}
          onChange={setRate}
          ocid="expected-return-slider"
        />
      </div>

      {/* Results */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-base text-foreground">
          {t("Your Estimate", "आपका अनुमान")}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <ResultCard
            label={t("Total Invested", "कुल निवेश")}
            value={fmt(totalInvested)}
            variant="blue"
          />
          <ResultCard
            label={t("Est. Returns", "अनुमानित रिटर्न")}
            value={fmt(estimatedReturns)}
            variant="green"
          />
        </div>
        <ResultCard
          label={t("Total Value", "कुल मूल्य")}
          value={fmt(totalValue)}
          variant="highlight"
        />
      </div>

      {/* Donut chart + legend */}
      <div className="card-elevated p-5">
        <h3 className="font-display font-semibold text-sm text-foreground mb-4">
          {t("Investment Breakdown", "निवेश विवरण")}
        </h3>
        <div className="flex items-center gap-6">
          <DonutChart invested={totalInvested} returns={estimatedReturns} />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("Invested", "निवेशित")}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {fmt(totalInvested)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("Returns", "रिटर्न")}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {fmt(estimatedReturns)}
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {t("Wealth Gain", "धन वृद्धि")}
              </p>
              <p className="text-sm font-bold text-accent">
                {totalInvested > 0
                  ? `${(((totalValue - totalInvested) / totalInvested) * 100).toFixed(1)}%`
                  : "0%"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <a
        href="https://wa.me/919027933533?text=Hello%2C%20I%20want%20financial%20advice."
        target="_blank"
        rel="noopener noreferrer"
        className="btn-success flex items-center justify-center gap-2 w-full py-4 text-base"
        data-ocid="calculator-cta"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {t("Get Free Investment Advice", "मुफ़्त निवेश सलाह पाएं")}
      </a>
    </div>
  );
}
