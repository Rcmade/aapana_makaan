"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Backpack, LogOut, ShoppingCart, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LoginButton from "@/components/buttons/LoginButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const user = useCurrentUser();
  const router = useRouter();

  const onClick = async () => {
    await signOut({ callbackUrl: "" });
    router.refresh();
  };
  return (
    <>
      {user?.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar key={user?.image}>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-primary">
                <User className="text-primary-foreground" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 space-y-2 " align="end">
            <DropdownMenuItem className="flex cursor-pointer gap-4" asChild>
              <Link href="/user/orders">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer gap-4" asChild>
              <Link href="/user/additional-info">
                <Backpack className="mr-2 h-4 w-4" />
                <span>Additional Info</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onClick}
              asChild
              className="relative z-10 flex cursor-pointer gap-4"
            >
              <Button
                type="button"
                className="flex  w-full justify-start hover:border-destructive"
                variant="ghost"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
