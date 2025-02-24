"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../../ui/button";

// export type LoginButtonProps = {};

export default function LogoutButton() {
  const mutation = useMutation({
    mutationFn: async () => signOut(),
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
        <LogOut className="mr-2" size={12} />
      )}
      Se Déconnecter
    </Button>
  );
}
