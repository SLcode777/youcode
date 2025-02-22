"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Chargement en cours...</p>;
  }

  return session ? (
    <button onClick={() => signOut()}>Se déconnecter</button>
  ) : (
    <button onClick={() => signIn()}>Se connecter</button>
  );
}
