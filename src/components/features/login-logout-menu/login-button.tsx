"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../../ui/button";

// export type LoginButtonProps = {};

export default function LoginButton() {
  const mutation = useMutation({
    mutationFn: async () => {
      signIn();
    },
  });

  return (
    <Button
      className="bg-transparent"
      variant="outline"
      size="sm"
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <LogIn className="mr-2" size={12} />
      )}
      Se Connecter
    </Button>
  );
}
