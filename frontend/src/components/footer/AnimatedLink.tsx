import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
}

export default function AnimatedLink({ href, children }: AnimatedLinkProps) {
  return (
    <Link href={href} className="group relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </Link>
  );
}
