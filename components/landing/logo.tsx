import { cn } from "@/lib/utils";

const Delta = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={cn("shrink-0", className)}
  >
    <path
      d="M12 3.2 21.4 20.8 H2.6 Z"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo = ({
  tagline = false,
  className,
}: {
  tagline?: boolean;
  className?: string;
}) => {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="inline-flex items-center gap-1.5">
        <Delta className="size-[1.15em]" />
        <span className="font-display text-[1.35em] font-bold uppercase leading-none tracking-tight">
          Heisenbug
        </span>
      </span>
      {tagline ? (
        <span className="mt-1.5 pl-0.5 text-[0.68em] font-medium tracking-[0.18em] text-muted-foreground">
          The bug that catches every bug
        </span>
      ) : null}
    </span>
  );
};
