"use client";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "./NavLink";

const UserNavLinks = () => {
  const { data } = useUserInfo();
  const pathname = usePathname();

  return (
    <>
      <NavLink href={"/property"} title={"Your property"} pathName={pathname}>
        {!!data?.propertyCount && (
          <span className="flex size-4 items-center justify-center rounded-full bg-black text-primary-foreground dark:text-primary">
            {data?.propertyCount}
          </span>
        )}
      </NavLink>
    </>
  );
};

export default UserNavLinks;
