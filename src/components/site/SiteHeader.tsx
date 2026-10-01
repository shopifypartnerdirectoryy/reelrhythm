import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/rr-logo.png";
import logoLightUrl from "@/assets/rr-logo-light.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow",
          scrolled ? "shadow-[0_1px_0_0_var(--color-border)]" : "hairline",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="container-editorial grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:h-20 lg:flex lg:justify-between lg:gap-6">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center"
            aria-label={`${SITE.name} home`}
          >
            <img src={logoUrl} alt={SITE.name} className="h-7 w-auto md:h-9" />
            <span className="sr-only">Reel &amp; Rhythm</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/search"
              aria-label="Search Reel & Rhythm"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
            >
              <Search className="size-[18px]" aria-hidden />
            </Link>
            <Button asChild variant="ink" size="sm" className="hidden sm:inline-flex">
              <Link to="/newsletter">Subscribe to R&amp;R Brief</Link>
            </Button>
            <button
              type="button"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm text-foreground lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-ink-foreground lg:hidden"
        >
          <div className="container-editorial flex h-16 items-center justify-between">
            <img src={logoLightUrl} alt={SITE.name} className="h-7 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-10 items-center justify-center rounded-sm"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="container-editorial flex-1 overflow-y-auto py-6">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.to} className="border-b border-ink-foreground/15">
                  <Link to={item.to} onClick={() => setOpen(false)} className="block py-4 text-2xl">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-ink-foreground/15">
                <Link to="/search" onClick={() => setOpen(false)} className="block py-4 text-2xl">
                  Search
                </Link>
              </li>
            </ul>
            <Button asChild variant="gold" size="lg" className="mt-8 w-full">
              <Link to="/newsletter" onClick={() => setOpen(false)}>
                Subscribe to R&amp;R Brief
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </>
  );
}
