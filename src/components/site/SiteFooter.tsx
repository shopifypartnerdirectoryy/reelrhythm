import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOOTER_NAV, SITE } from "@/data/site";
import logoUrl from "@/assets/rr-logo.png";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-editorial py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-3 text-xl tracking-[0.18em] uppercase">
              <img src={logoUrl} alt="" className="h-10 w-auto rounded-sm bg-ink-foreground/95 px-1.5 py-1" />
              Reel <span className="text-gold">&amp;</span> Rhythm
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-foreground/70">{SITE.tagline}</p>
            <ul className="mt-6 flex items-center gap-3">
              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Reel & Rhythm on X"
                  className="inline-flex size-9 items-center justify-center rounded-sm border border-ink-foreground/25 text-ink-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                    <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.9l7.5-8.6L2.5 2H9l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
                  </svg>
                </a>
              </li>
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Reel & Rhythm on ${label}`}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-ink-foreground/25 text-ink-foreground/80 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ink-foreground/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-gold">Newsletter</p>
            <p className="mt-5 text-sm text-ink-foreground/75">
              The African creative economy, in your inbox every week.
            </p>
            <Button asChild variant="gold" className="mt-5">
              <Link to="/newsletter">Subscribe to R&amp;R Brief</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-foreground/20 pt-6 text-xs text-ink-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Reel &amp; Rhythm. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link to="/privacy" className="hover:text-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gold">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-gold">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
