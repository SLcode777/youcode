"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface ClientCheckerProps {
  users:
    | {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        canceled: boolean;
      }[]
    | undefined;
}

export default function ClientChecker({ users }: ClientCheckerProps) {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Session côté client :", session);
    console.log("Utilisateurs reçus :", users);
  }, [session, users]);

  return null;
}
