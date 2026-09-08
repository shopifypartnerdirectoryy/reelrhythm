import { SITE } from "@/data/site";
import { Breadcrumbs } from "./primitives";

export function LegalPage({
  label,
  title,
  intro,
  sections,
}: {
  label: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <div className="container-editorial py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label }]} />
      <p className="eyebrow text-primary">{label}</p>
      <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-5xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      <p className="eyebrow mt-4 text-muted-foreground">Last updated {SITE.updated}</p>

      <div className="mt-10 max-w-3xl">
        {sections.map((section) => (
          <section key={section.heading} className="border-t border-border py-8">
            <h2 className="text-2xl leading-snug">{section.heading}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-4 text-lg leading-[1.8] text-foreground/85">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
        This page is placeholder wording during development. Replace it with your reviewed legal
        text before publishing.
      </p>
    </div>
  );
}
