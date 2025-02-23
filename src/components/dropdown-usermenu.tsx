import { LogoutDialog } from "@/components/logout-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>User (placeholder)</DropdownMenuTrigger>
      <DropdownMenuContent>
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
