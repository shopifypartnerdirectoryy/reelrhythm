import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Enter a valid email address")
    .max(255, "Email is too long"),
});

export function NewsletterSignup({
  variant = "panel",
  className,
}: {
  variant?: "panel" | "inline" | undefined;
  className?: string;
}) {
  const [values, setValues] = useState({ firstName: "", email: "" });
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: { firstName?: string; email?: string } = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]) as "firstName" | "email";
        next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setDone(true);
  };

  const inverted = variant === "panel";
  const inputClass = cn(
    "h-11 w-full rounded-sm border bg-transparent px-3 text-sm outline-none transition-colors",
    inverted
      ? "border-ink-foreground/25 text-ink-foreground placeholder:text-ink-foreground/40 focus:border-gold"
      : "border-border text-foreground placeholder:text-muted-foreground focus:border-primary",
  );
  const labelClass = cn(
    "eyebrow mb-2 block",
    inverted ? "text-ink-foreground/60" : "text-muted-foreground",
  );

  if (done) {
    return (
      <div
        className={cn(
          "rounded-sm border p-6",
          inverted ? "border-ink-foreground/25 text-ink-foreground" : "border-border",
          className,
        )}
        role="status"
      >
        <p className="text-lg">Thank you — you're on the list.</p>
        <p className={cn("mt-2 text-sm", inverted ? "text-ink-foreground/70" : "text-muted-foreground")}>
          The next R&amp;R Brief will arrive in your inbox. This is a demo form; no data is stored.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`nl-first-${variant}`} className={labelClass}>
            First Name
          </label>
          <input
            id={`nl-first-${variant}`}
            name="firstName"
            autoComplete="given-name"
            className={inputClass}
            placeholder="Amara"
            value={values.firstName}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? `nl-first-err-${variant}` : undefined}
            onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
          />
          {errors.firstName ? (
            <p id={`nl-first-err-${variant}`} className="mt-1 text-xs text-destructive">
              {errors.firstName}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`nl-email-${variant}`} className={labelClass}>
            Email Address
          </label>
          <input
            id={`nl-email-${variant}`}
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `nl-email-err-${variant}` : undefined}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
          {errors.email ? (
            <p id={`nl-email-err-${variant}`} className="mt-1 text-xs text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant={inverted ? "gold" : "default"}>
          Subscribe to R&amp;R Brief
        </Button>
        <p className={cn("text-xs", inverted ? "text-ink-foreground/55" : "text-muted-foreground")}>
          One email a week. No advertising lists, no data sharing. Unsubscribe any time.
        </p>
      </div>
    </form>
  );
}
