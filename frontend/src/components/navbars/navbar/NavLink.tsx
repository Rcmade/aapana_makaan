import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface NavLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  title: string;
  pathName: string;
  activeClassName?: string;
}
const NavLink = ({
  href,
  title,
  pathName,
  children,
  onClick,
  className,
  activeClassName,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-between border-b py-4 text-lg font-semibold text-muted-foreground transition-all hover:text-primary md:border-none md:py-0 md:text-base",
        href === pathName ? "text-primary" : "",
        className,
        href === pathName && activeClassName ? activeClassName : "",
      )}
      key={href}
      onClick={onClick}
    >
      <span> {title}</span>
      {children}
    </Link>
  );
};

export default NavLink;
