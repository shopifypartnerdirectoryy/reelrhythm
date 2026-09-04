import { Link2, Linkedin, Mail, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ShareButtons({
  title,
  className,
  orientation = "horizontal",
}: {
  title: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () => (typeof window === "undefined" ? "" : window.location.href);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const btn =
    "inline-flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary";

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        orientation === "vertical" && "flex-col",
        className,
      )}
    >
      <span className="eyebrow text-muted-foreground">Share</span>
      <a
        className={btn}
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.9l7.5-8.6L2.5 2H9l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
        </svg>
      </a>
      <a
        className={btn}
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="size-4" aria-hidden />
      </a>
      <a className={btn} href={`mailto:?subject=${encodeURIComponent(title)}`} aria-label="Share by email">
        <Mail className="size-4" aria-hidden />
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
