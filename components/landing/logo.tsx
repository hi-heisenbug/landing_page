import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({
  tagline = false,
  className,
}: {
  tagline?: boolean;
  className?: string;
}) => {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="inline-flex items-center">
        <Image
          src="/heisenbug_logo.png"
          alt="Heisenbug Logo"
          width={148}
          height={40}
          priority
          className="h-10 w-auto object-contain"
        />
      </span>
      {tagline ? (
        <span className="mt-1.5 pl-0.5 text-[0.68em] font-medium tracking-[0.18em] text-muted-foreground">
          The bug that catches every bug
        </span>
      ) : null}
    </span>
  );
};
