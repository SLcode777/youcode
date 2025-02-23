"use client";

import { signIn, useSession } from "next-auth/react";
import { DropdownUserMenu } from "../components/dropdown-usermenu";
import { Button } from "./ui/button";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Chargement en cours...</p>;
  }

  return session ? (
    <DropdownUserMenu />
  ) : (
    <Button onClick={() => signIn()}>Se connecter</Button>
  );
}
