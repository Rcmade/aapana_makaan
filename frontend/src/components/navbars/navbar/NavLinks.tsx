"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { navLinkContent } from "@/content/nav";
import NavLink from "./NavLink";
import UserNavLinks from "./UserNavLinks";

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
}
const NavLinks = ({ onClick, className, activeClassName }: NavLinksProps) => {
  const pathName = usePathname();
  return (
    <>
      {navLinkContent.map((i) => (
        <NavLink
          onClick={onClick}
          href={i.href}
          title={i.title}
          pathName={pathName}
          key={i.href}
          className={className}
          activeClassName={activeClassName}
        />
      ))}
      <UserNavLinks />
    </>
  );
};

export default NavLinks;
