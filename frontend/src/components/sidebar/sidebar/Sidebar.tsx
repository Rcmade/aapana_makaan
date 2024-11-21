import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "@/components/navbars/navbar/NavLinks";
import LogoButton from "@/components/buttons/LogoButton";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle>
          <LogoButton />
        </SheetTitle>
        <NavLinks />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
