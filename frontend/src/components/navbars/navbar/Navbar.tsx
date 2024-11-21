"use client";
import { ModeToggle } from "@/components/buttons/ThemeButton";
import NavLinks from "./NavLinks";
import LogoButton from "@/components/buttons/LogoButton";
import Sidebar from "@/components/sidebar/sidebar/Sidebar";
import AddPropertyButton from "@/components/buttons/AddPropertyButton";
import Container from "@/components/layouts/Container";

export default function Navbar() {
  return (
    <header className="border-b">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center sm:gap-2 lg:gap-8">
          <Sidebar />
          <LogoButton />
        </div>
        <nav className="hidden items-center gap-2 space-x-4 px-2 sm:gap-4 md:flex md:gap-8 lg:gap-12">
          <NavLinks />
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <AddPropertyButton />
        </div>
      </Container>
    </header>
  );
}
