"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "../../ui/button";

type LoginButtonProps = ButtonProps;

export default function LoginButton({
  size = "sm",
  variant = "outline",
  ...props
}: LoginButtonProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      signIn();
    },
  });

  return (
    <Button
      className="bg-transparent"
      variant={variant}
      size={size}
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
      {...props}
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
