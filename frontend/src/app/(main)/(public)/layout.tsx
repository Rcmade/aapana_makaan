import Container from "@/components/layouts/Container";
import Navbar from "@/components/navbars/navbar/Navbar";
import {type Children } from "@/types";
import React from "react";

const layout = ({ children }: Children) => {
  return (
    <div>
      <Navbar />
      <Container asChild>
        <main className="mx-auto max-w-[98rem] px-1 sm:px-2">{children}</main>
      </Container>
    </div>
  );
};

export default layout;
