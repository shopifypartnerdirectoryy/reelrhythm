import { cn } from "@/lib/utils";
import { movementOf } from "@/data/rankings";
import type { Ranking } from "@/data/types";
import { EmptyState, MovementIndicator } from "./primitives";

export function RankingTable({
  ranking,
  limit,
  compact = false,
}: {
  ranking: Ranking;
  limit?: number | undefined;
  compact?: boolean | undefined;
}) {
  const rows = limit ? ranking.rows.slice(0, limit) : ranking.rows;

  if (rows.length === 0) {
    return (
      <EmptyState
        title="No ranking data available for this period."
        description="Once verified returns are received for this period, the table will publish here."
      />
    );
  }

  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">
          {ranking.title} — {ranking.period}
        </caption>
        <thead>
          <tr className="border-y border-border">
            <th scope="col" className="eyebrow w-14 py-3 text-muted-foreground">
              Rank
            </th>
            <th scope="col" className="eyebrow py-3 text-muted-foreground">
              {ranking.entityLabel}
            </th>
            {!compact ? (
              <th scope="col" className="eyebrow py-3 text-muted-foreground">
                Country
              </th>
            ) : null}
            <th scope="col" className="eyebrow py-3 text-right text-muted-foreground">
              {ranking.metricLabel}
            </th>
            <th scope="col" className="eyebrow py-3 text-right text-muted-foreground">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const movement = movementOf(row);
            return (
              <tr
                key={`${row.rank}-${row.title}`}
                className="border-b border-border transition-colors hover:bg-muted/50"
              >
                <td className="num py-4 text-lg text-foreground">
                  {String(row.rank).padStart(2, "0")}
                </td>
                <td className="py-4 pr-4">
                  <span className="block font-medium text-foreground">{row.title}</span>
                  {row.subtitle ? (
                    <span className="block text-xs text-muted-foreground">{row.subtitle}</span>
                  ) : null}
                  {compact ? (
                    <span className="block text-xs text-muted-foreground md:hidden">
                      {row.country}
                    </span>
                  ) : null}
                </td>
                {!compact ? (
                  <td className="py-4 pr-4 text-sm text-muted-foreground">{row.country}</td>
                ) : null}
                <td className="num py-4 text-right text-sm text-foreground">{row.metricValue}</td>
                <td className="py-4 text-right">
                  <span className="inline-flex items-center justify-end gap-2">
                    <MovementIndicator
                      movement={movement}
                      delta={row.previousRank !== null ? row.previousRank - row.rank : null}
                    />
                    {row.changePct !== undefined ? (
                      <span
                        className={cn(
                          "num text-xs",
                          row.changePct > 0
                            ? "text-up"
                            : row.changePct < 0
                              ? "text-down"
                              : "text-muted-foreground",
                        )}
                      >
                        {row.changePct > 0 ? "+" : ""}
                        {row.changePct.toFixed(1)}%
                      </span>
                    ) : null}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
