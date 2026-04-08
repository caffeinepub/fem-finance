import { useLanguage } from "@/hooks/useLanguage";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Briefcase, Calculator, Home, Phone } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", icon: Home, labelEN: "Home", labelHI: "होम" },
  { path: "/services", icon: Briefcase, labelEN: "Services", labelHI: "सेवाएं" },
  {
    path: "/calculator",
    icon: Calculator,
    labelEN: "Calculator",
    labelHI: "कैलकु.",
  },
  {
    path: "/education",
    icon: BookOpen,
    labelEN: "Education",
    labelHI: "शिक्षा",
  },
  { path: "/contact", icon: Phone, labelEN: "Contact", labelHI: "संपर्क" },
] as const;

export function BottomNav() {
  const routerState = useRouterState();
  const { lang } = useLanguage();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border"
      style={{ maxWidth: "768px", margin: "0 auto" }}
      aria-label="Main navigation"
      data-ocid="bottom-nav"
    >
      <div className="flex items-stretch">
        {NAV_ITEMS.map(({ path, icon: Icon, labelEN, labelHI }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] transition-smooth ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={active ? "page" : undefined}
              data-ocid={`nav-${path.replace("/", "") || "home"}`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.75}
                className={active ? "text-primary" : ""}
              />
              <span
                className={`text-[10px] font-medium leading-none ${active ? "text-primary font-semibold" : ""}`}
              >
                {lang === "HI" ? labelHI : labelEN}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
