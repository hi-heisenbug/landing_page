import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors-and-shadows duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 [&_svg]:shrink-0 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "border border-[#464646]/10 bg-white/80 backdrop-blur-md text-[#464646] hover:border-[#464646]/20 hover:bg-white shadow-button hover:shadow-button-hover",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
        iconButton:
          "border border-[#7fbf3a] bg-gradient-to-r from-[#93cb52] to-[#7ec241] text-primary-foreground hover:brightness-[0.96] disabled:bg-primary/50 shadow-[0_1px_2px_rgba(147,203,82,0.15),0_2px_8px_rgba(147,203,82,0.1)] hover:shadow-[0_2px_12px_rgba(147,203,82,0.35),0_6px_24px_rgba(147,203,82,0.2)]",
        "outline-glow":
          "border border-[#464646]/15 bg-transparent text-[#464646] hover:border-[#93cb52]/50 hover:shadow-[0_0_16px_rgba(147,203,82,0.12)] hover:text-[#464646]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "size-9",
        "icon-lg": "size-10",
        "icon-xl": "size-11",
      },
      shine: {
        true: "relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine after:pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shine: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, shine, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, shine }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
