import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryName, formatDate } from "@/data/site";
import { authorName } from "@/data/authors";
import type { Article, Author, BriefEdition, Report } from "@/data/types";
import { Eyebrow } from "./primitives";
import reportCover from "@/assets/report-cover.jpg";

export function ArticleMeta({
  article,
  className,
  inverted,
}: {
  article: Article;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs",
        inverted ? "text-ink-foreground/60" : "text-muted-foreground",
        className,
      )}
    >
      <Link
        to="/author/$slug"
        params={{ slug: article.authorSlug }}
        className="font-medium hover:text-primary link-underline"
      >
        {authorName(article.authorSlug)}
      </Link>
      <span aria-hidden>·</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{article.readingTime} min read</span>
    </p>
  );
}

export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
      {!compact ? (
        <Link
          to="/insights/$slug"
          params={{ slug: article.slug }}
          tabIndex={-1}
          aria-hidden
          className="block overflow-hidden"
        >
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            decoding="async"
            width={1200}
            height={800}
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <Eyebrow>{categoryName(article.category)}</Eyebrow>
        <h3 className="mt-3 text-xl leading-snug">
          <Link
            to="/insights/$slug"
            params={{ slug: article.slug }}
            className="link-underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        {article.dataPoint ? (
          <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="num text-sm text-foreground">{article.dataPoint.value}</span>{" "}
            {article.dataPoint.label}
          </p>
        ) : null}
        <div className="mt-auto pt-5">
          <ArticleMeta article={article} />
        </div>
      </div>
    </article>
  );
}

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="group grid gap-8 lg:grid-cols-2 lg:items-center">
      <Link
        to="/insights/$slug"
        params={{ slug: article.slug }}
        tabIndex={-1}
        aria-hidden
        className="overflow-hidden rounded-sm border border-border"
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div>
        <Eyebrow>{categoryName(article.category)}</Eyebrow>
        <h3 className="mt-4 text-3xl leading-[1.1] md:text-5xl">
          <Link to="/insights/$slug" params={{ slug: article.slug }} className="link-underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.deck}</p>
        <div className="mt-6">
          <ArticleMeta article={article} />
        </div>
      </div>
    </article>
  );
}

export function BriefCard({ brief }: { brief: BriefEdition }) {
  return (
    <article className="card-lift flex h-full flex-col rounded-sm border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <Eyebrow>Edition {brief.number}</Eyebrow>
        <time dateTime={brief.date} className="num text-xs text-muted-foreground">
          {formatDate(brief.date)}
        </time>
      </div>
      <h3 className="mt-4 text-2xl leading-snug">
        <Link to="/brief/$edition" params={{ edition: brief.slug }} className="link-underline">
          {brief.headline}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{brief.summary}</p>
      <div className="mt-auto pt-6">
        <Link
          to="/brief/$edition"
          params={{ edition: brief.slug }}
          className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <span className="link-underline">Read this edition</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function ReportCard({ report }: { report: Report }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
      <img
        src={reportCover}
        alt=""
        loading="lazy"
        decoding="async"
        width={1000}
        height={1300}
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Eyebrow>{report.category}</Eyebrow>
          <time dateTime={report.date} className="num text-xs text-muted-foreground">
            {formatDate(report.date)}
          </time>
        </div>
        <h3 className="mt-3 text-2xl leading-snug">
          <Link to="/reports/$slug" params={{ slug: report.slug }} className="link-underline">
            {report.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.description}</p>
        <p className="num mt-5 flex items-center gap-3 text-xs text-muted-foreground">
          <FileText className="size-4" aria-hidden />
          {report.pages} pages · {report.dataPoints} data points
        </p>
        <div className="mt-auto flex flex-wrap gap-4 pt-6">
          <Link
            to="/reports/$slug"
            params={{ slug: report.slug }}
            className="text-sm font-medium text-primary link-underline"
          >
            Read report
          </Link>
          <Link
            to="/reports/$slug"
            params={{ slug: report.slug }}
            hash="download"
            className="text-sm font-medium text-muted-foreground link-underline"
          >
            Download report
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <article className="card-lift flex h-full flex-col rounded-sm border border-border bg-card p-6">
      <div
        className="num flex size-14 items-center justify-center rounded-full bg-ink text-lg text-ink-foreground"
        aria-hidden
      >
        {author.initials}
      </div>
      <h3 className="mt-4 text-xl">
        <Link to="/author/$slug" params={{ slug: author.slug }} className="link-underline">
          {author.name}
        </Link>
      </h3>
      <p className="eyebrow mt-1 text-primary">{author.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {author.expertise.map((item) => (
          <li
            key={item}
            className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ProductCard({
  eyebrow,
  description,
  cta,
  to,
  index,
}: {
  eyebrow: string;
  description: string;
  cta: string;
  to: string;
  index: number;
}) {
  return (
    <article className="card-lift group flex h-full flex-col border-t-2 border-ink/80 bg-card p-6">
      <span className="num text-xs text-muted-foreground">0{index + 1}</span>
      <h3 className="mt-3 text-2xl leading-snug">{eyebrow}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-auto pt-8">
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={to as any}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <span className="link-underline">{cta}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
