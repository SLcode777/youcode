import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export function LogoutDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full text-sm dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-sm leading-8">
          Se Déconnecter
        </button>
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
          <AlertDialogAction onClick={() => signOut()}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
