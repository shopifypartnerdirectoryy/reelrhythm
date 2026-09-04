import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReactNode } from "react";
import type { SeriesPoint } from "@/data/types";
import { SampleDataBadge } from "./primitives";

const axisProps = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

function ChartFrame({
  title,
  subtitle,
  source,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  source?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <figure className="rounded-sm border border-border bg-card p-5">
      <figcaption className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-primary">{title}</p>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <SampleDataBadge />
      </figcaption>
      <div className="h-64 w-full">{children}</div>
      {footer}
      {source ? (
        <p className="eyebrow mt-4 border-t border-border pt-3 text-muted-foreground">
          Source: {source}
        </p>
      ) : null}
    </figure>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "2px",
  fontSize: "12px",
  color: "var(--color-foreground)",
} as const;

export function LineChartCard({
  title,
  subtitle,
  data,
  source,
  comparisonLabel,
}: {
  title: string;
  subtitle?: string;
  data: SeriesPoint[];
  source?: string;
  comparisonLabel?: string;
}) {
  return (
    <ChartFrame title={title} subtitle={subtitle} source={source}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="rrArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis {...axisProps} width={44} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-border)" }} />
          <Area
            type="monotone"
            dataKey="value"
            name="Index"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            fill="url(#rrArea)"
          />
          {data.some((d) => d.comparison !== undefined) ? (
            <Line
              type="monotone"
              dataKey="comparison"
              name={comparisonLabel ?? "Comparison"}
              stroke="var(--color-chart-2)"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function BarChartCard({
  title,
  subtitle,
  data,
  source,
  unit = "%",
}: {
  title: string;
  subtitle?: string;
  data: SeriesPoint[];
  source?: string;
  unit?: string;
}) {
  return (
    <ChartFrame title={title} subtitle={subtitle} source={source}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="label" {...axisProps} interval={0} />
          <YAxis {...axisProps} width={44} unit={unit} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
          <Bar dataKey="value" name="Share" fill="var(--color-chart-1)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function ComparisonChartCard({
  title,
  subtitle,
  data,
  source,
}: {
  title: string;
  subtitle?: string;
  data: SeriesPoint[];
  source?: string;
}) {
  return (
    <ChartFrame title={title} subtitle={subtitle} source={source}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis {...axisProps} width={44} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-border)" }} />
          <Line
            type="monotone"
            dataKey="value"
            name="This period"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="comparison"
            name="Prior period"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
