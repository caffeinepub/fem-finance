import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Center content on large screens */}
      <div className="mx-auto" style={{ maxWidth: "768px" }}>
        <Header />
        <main
          className="pt-14 pb-20 min-h-screen bg-background"
          data-ocid="main-content"
        >
          {children}
        </main>
        <footer className="text-center py-3 pb-20 text-xs text-muted-foreground bg-muted/40 border-t border-border">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </footer>
        <BottomNav />
      </div>
      <WhatsAppButton />
      <Toaster position="top-center" richColors />
    </div>
  );
}
