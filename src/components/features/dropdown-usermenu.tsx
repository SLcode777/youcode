import { LogoutDialog } from "@/components/features/logout-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import { Button } from "../ui/button";

export type DropdownUserMenuProps = {
  user: Session["user"];
};

export function DropdownUserMenu(props: DropdownUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm">
          <Avatar>
            <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
            {props.user.image && (
              <AvatarImage
                className="rounded-full"
                width={24}
                height={24}
                src={props.user.image}
                alt={props.user.name ?? "user picture"}
              />
            )}
          </Avatar>
          {props.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>Mon profil</DropdownMenuItem>
        <DropdownMenuItem>Factures</DropdownMenuItem>
        <DropdownMenuItem>Temp</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogoutDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
