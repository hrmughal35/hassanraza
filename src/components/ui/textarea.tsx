import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-28 w-full rounded-xl border border-[#233246] bg-[#0b111a]/84 px-4 py-3 text-sm text-[#f5fbff] placeholder:text-[#89a4bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
