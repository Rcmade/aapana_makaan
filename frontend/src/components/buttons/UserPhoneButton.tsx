import React from "react";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

interface UserPhoneButtonProps {
  phone: string | null;
  id: string;
}
const UserPhoneButton = ({ id, phone }: UserPhoneButtonProps) => {
  return (
    <Button size="sm" variant="outline" className="gap-2">
      <Phone className="h-4 w-4" />
      <span className="hidden sm:inline">{phone || "Not added"}</span>
    </Button>
  );
};

export default UserPhoneButton;
