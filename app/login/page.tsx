"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1>Se connecter</h1>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Connexion avec GitHub
      </button>
    </div>
  );
}
