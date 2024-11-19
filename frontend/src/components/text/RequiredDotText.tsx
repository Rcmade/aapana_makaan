import { cn } from "@/lib/utils";
import React from "react";

interface RequiredDotTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const RequiredDotText = ({ className, ...rest }: RequiredDotTextProps) => {
  return (
    <span {...rest} className={cn("text-lg text-destructive", className)}>
      *
    </span>
  );
};

export default RequiredDotText;
