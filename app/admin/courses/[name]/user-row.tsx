"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Menu } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

type UserRowProps = {
  user: {
    id: string;
    image: string | null;
    name: string | null;
    createdAt: Date;
    email: string | null;
    canceled: boolean;
  };
};

export function UserRow({ user }: UserRowProps) {
  const router = useRouter();

  return (
    <TableRow
      key={user.id}
      className="cursor-pointer"
      onClick={() => {
        router.push(`/admin/user/${user.id}`);
      }}
    >
      <TableCell>
        <Image
          src={user.image ?? "/file.svg"}
          alt={user.name ?? "user avatar"}
          width={32}
          height={32}
          className="rounded-full"
        />
      </TableCell>
      <TableCell>{user?.name ?? "Nom inconnu"}</TableCell>

      <TableCell>{user?.email ?? "Email inconnu"}</TableCell>
      <TableCell className="text-center">
        {user.canceled ? (
          <Badge variant={"destructive"}>INACTIF</Badge>
        ) : (
          <Badge variant={"outline"}>ACTIF</Badge>
        )}
      </TableCell>
      <TableCell className="text-center">
        <Menu
          className="h-5 w-5 mx-auto hover:text-primary cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            alert("test click menu");
          }}
        />
      </TableCell>
    </TableRow>
  );
}
