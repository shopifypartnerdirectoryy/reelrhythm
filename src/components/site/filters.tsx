import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryFilter({
  options,
  value,
  onChange,
  label = "Filter by category",
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <ul className="flex min-w-max items-center gap-2 md:flex-wrap">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => onChange(option.value)}
                aria-pressed={active}
                className={cn(
                  "eyebrow rounded-sm border px-3 py-2 transition-colors",
                  active
                    ? "border-ink bg-ink text-ink-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search articles, editions, reports and rankings",
  id = "search-input",
  label = "Search Reel & Rhythm",
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  label?: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      <div className="flex items-center gap-3 border-b-2 border-foreground/80 pb-3">
        <Search className="size-5 text-muted-foreground" aria-hidden />
        <input
          id={id}
          type="search"
          value={value}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value.slice(0, 120))}
          placeholder={placeholder}
          className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground md:text-2xl"
        />
      </div>
    </div>
  );
}

export function SelectFilter({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-[9rem]">
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
