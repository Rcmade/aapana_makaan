import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  asChild,
  ...rest
}) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={cn("max-w-[98rem] mx-auto px-2", className)} {...rest}>
      {children}
    </Comp>
  );
};

export default Container;
