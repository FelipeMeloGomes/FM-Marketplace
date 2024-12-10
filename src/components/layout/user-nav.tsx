"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, signIn, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function UserNav() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/login" });
    } else {
      signIn();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@felipemelo" />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">FelipeMelo</p>
            <p className="text-xs leading-none text-muted-foreground">
              felipemelo
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAuthClick}>
          {isAuthenticated ? (
            <Button
              className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
            >
              Sair
            </Button>
          ) : (
            <Button
              className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
            >
              Entrar
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
