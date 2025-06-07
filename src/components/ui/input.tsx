import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, type, ...props }, ref) => (
    <input ref={ref} type={type} className={cn("", className)} {...props} />
  )
);
Input.displayName = "Input";

export { Input };
