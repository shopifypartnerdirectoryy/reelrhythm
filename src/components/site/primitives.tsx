import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUp, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/data/site";
import type { Movement } from "@/data/types";

export function Eyebrow({
  children,
  className,
  as: As = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h2";
}) {
  return <As className={cn("eyebrow text-primary", className)}>{children}</As>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  className,
  inverted,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t pt-6 md:flex-row md:items-end md:justify-between",
        inverted ? "border-ink-foreground/20" : "border-border",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className={cn("eyebrow", inverted ? "text-gold" : "text-primary")}>{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "mt-2 text-3xl leading-[1.1] md:text-4xl",
            inverted ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "mt-3 text-base leading-relaxed",
              inverted ? "text-ink-foreground/70" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function ArrowLink({
  to,
  children,
  className,
  params,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  params?: Record<string, string>;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      params={params as never}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-primary",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function DataSourceBadge({ source, className }: { source: string; className?: string }) {
  return (
    <p className={cn("eyebrow text-muted-foreground", className)}>
      <span className="text-foreground/70">Source:</span> {source}
    </p>
  );
}

export function UpdateTimestamp({ date, label = "Updated" }: { date: string; label?: string }) {
  return (
    <p className="eyebrow text-muted-foreground">
      {label}:{" "}
      <time dateTime={date} className="num text-foreground/70">
        {formatDate(date)}
      </time>
    </p>
  );
}

export function MethodologyNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-sm border border-border bg-muted/50 p-5">
      <p className="eyebrow text-primary">Methodology</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
      <Link to="/methodology" className="mt-3 inline-block text-sm font-medium text-primary link-underline">
        Read the full methodology
      </Link>
    </aside>
  );
}

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center rounded-sm border border-gold/50 bg-gold/10 px-2 py-1 text-[0.625rem] text-gold-foreground/80",
        className,
      )}
    >
      Sample data
    </span>
  );
}

export function KPIStat({
  value,
  label,
  note,
  change,
  inverted,
}: {
  value: string;
  label: string;
  note?: string;
  change?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border-t pt-5",
        inverted ? "border-ink-foreground/25" : "border-border",
      )}
    >
      <p
        className={cn(
          "num text-4xl md:text-5xl",
          inverted ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-3 text-sm font-medium",
          inverted ? "text-ink-foreground/85" : "text-foreground",
        )}
      >
        {label}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {change ? <span className="num text-xs text-gold">{change}</span> : null}
        {note ? (
          <span
            className={cn(
              "eyebrow text-[0.625rem]",
              inverted ? "text-ink-foreground/50" : "text-muted-foreground",
            )}
          >
            {note}
          </span>
        ) : null}
      </div>
    </div>
  );
}

const MOVEMENT_LABEL: Record<Movement, string> = {
  up: "Up",
  down: "Down",
  same: "No change",
  new: "New entry",
};

export function MovementIndicator({
  movement,
  delta,
}: {
  movement: Movement;
  delta?: number | null;
}) {
  const base = "inline-flex items-center gap-1 num text-xs";
  if (movement === "new") {
    return (
      <span className={cn(base, "text-gold")}>
        <span className="eyebrow text-[0.625rem]">New</span>
        <span className="sr-only">New entry</span>
      </span>
    );
  }
  if (movement === "same") {
    return (
      <span className={cn(base, "text-muted-foreground")}>
        <Minus className="size-3" aria-hidden />
        <span className="sr-only">{MOVEMENT_LABEL.same}</span>
      </span>
    );
  }
  const Icon = movement === "up" ? ArrowUp : ArrowDown;
  return (
    <span className={cn(base, movement === "up" ? "text-up" : "text-down")}>
      <Icon className="size-3" aria-hidden />
      {delta ? Math.abs(delta) : null}
      <span className="sr-only">
        {MOVEMENT_LABEL[movement]} {delta ? Math.abs(delta) : ""} places
      </span>
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link to={item.to as any} className="hover:text-primary link-underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/70" aria-current="page">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-sm border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <p className="text-lg text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="rounded-sm border border-border px-3 py-2 text-sm disabled:opacity-40"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            "num rounded-sm border px-3 py-2 text-sm",
            n === page
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-accent",
          )}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-sm border border-border px-3 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}
