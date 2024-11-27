import Navbar from "@/components/navbars/navbar/Navbar";
import {type Children } from "@/types";
import React from "react";

const layout = ({ children }: Children) => {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-[98rem] px-2">{children}</main>
      {/* <Container asChild>
      </Container> */}
    </div>
  );
};

export default layout;
