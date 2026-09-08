import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, SectionHeading } from "@/components/site/primitives";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Enter a valid email address")
    .max(255, "Email is too long"),
  organisation: z.string().trim().max(120, "Organisation is too long"),
  topic: z.string().trim().min(1, "Please choose a topic"),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us how we can help")
    .max(1500, "Message must be under 1500 characters"),
});

const TOPICS = [
  "Research partnership",
  "Data licensing",
  "Press enquiry",
  "Speaking request",
  "Correction to a published figure",
  "Something else",
];

const DESKS = [
  { label: "Research & data", text: "Methodology questions, data licensing and partnership enquiries." },
  { label: "Editorial", text: "Story tips, corrections and requests to review published analysis." },
  { label: "Commercial", text: "Sponsorship of the Brief, reports and bespoke research briefs." },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Reel & Rhythm" },
      {
        name: "description",
        content:
          "Contact Reel & Rhythm about research partnerships, data licensing, press enquiries, corrections and speaking requests.",
      },
      { property: "og:title", content: "Contact — Reel & Rhythm" },
      { property: "og:description", content: "Reach the R&R research, editorial and commercial desks." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Values = z.infer<typeof schema>;

function ContactPage() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    organisation: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Values, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const field = (key: keyof Values) =>
    errors[key]
      ? { "aria-invalid": true as const, "aria-describedby": `${key}-error` }
      : {};

  const inputClass =
    "mt-2 h-11 w-full rounded-sm border border-border bg-card px-3 text-base outline-none focus-visible:border-primary";

  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <p className="eyebrow text-primary">Contact</p>
      <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">Talk to the desk.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Research partnerships, data licensing, press, corrections and speaking requests all reach us
        through this form.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,34rem)_1fr]">
        <div>
          {sent ? (
            <div className="rounded-sm border border-border bg-secondary/50 p-8">
              <p className="text-2xl leading-snug">Thanks — your message is ready to send.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This form is a demo during development and stores nothing. Once a mailbox or backend
                is connected, messages will route to the relevant desk.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                Write another message
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="name" className="eyebrow text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  className={inputClass}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value.slice(0, 100))}
                  {...field("name")}
                />
                {errors.name ? (
                  <p id="name-error" className="mt-2 text-sm text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="eyebrow text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={values.email}
                  onChange={(e) => set("email", e.target.value.slice(0, 255))}
                  {...field("email")}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="organisation" className="eyebrow text-muted-foreground">
                  Organisation (optional)
                </label>
                <input
                  id="organisation"
                  className={inputClass}
                  value={values.organisation}
                  onChange={(e) => set("organisation", e.target.value.slice(0, 120))}
                />
              </div>

              <div>
                <label htmlFor="topic" className="eyebrow text-muted-foreground">
                  Topic
                </label>
                <select
                  id="topic"
                  className={inputClass}
                  value={values.topic}
                  onChange={(e) => set("topic", e.target.value)}
                  {...field("topic")}
                >
                  <option value="">Select a topic</option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                {errors.topic ? (
                  <p id="topic-error" className="mt-2 text-sm text-destructive">
                    {errors.topic}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="eyebrow text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="mt-2 w-full rounded-sm border border-border bg-card p-3 text-base outline-none focus-visible:border-primary"
                  value={values.message}
                  onChange={(e) => set("message", e.target.value.slice(0, 1500))}
                  {...field("message")}
                />
                <p className="num mt-2 text-xs text-muted-foreground">
                  {values.message.length}/1500
                </p>
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <Button type="submit" variant="ink" size="lg">
                Send message
              </Button>
            </form>
          )}
        </div>

        <aside className="space-y-8">
          <SectionHeading eyebrow="Desks" title="Where enquiries land" />
          {DESKS.map((desk) => (
            <div key={desk.label} className="border-t border-border pt-5">
              <h3 className="text-xl">{desk.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desk.text}</p>
            </div>
          ))}
          <div className="rounded-sm border border-dashed border-border p-5 text-sm text-muted-foreground">
            Contact details are placeholders during development. Share the addresses you want listed
            and we will publish them here.
          </div>
        </aside>
      </div>
    </div>
  );
}
