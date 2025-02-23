"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function LogoutDialog() {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="px-2 gap-2 w-full flex flex-row  border-red-300 p-1  dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-sm leading-8">
          <LogOut
            className="  place-self-center items-center justify-center "
            size={20}
          />
          <button className="w-full text-left text-sm dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-sm leading-6 border-green-600">
            Se Déconnecter
          </button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Etes-vous sûr de vouloir vous déconnecter maintenant ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button
            onClick={() => {
              mutation.mutate();
            }}
            variant="destructive"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Loader size={12} /> : <LogOut size={12} />}
            Confirmer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
