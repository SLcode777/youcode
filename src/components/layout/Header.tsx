import { getAuthSession } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { LoginLogoutContainer } from "../features/login-logout-menu/login-logout-container";
import { ThemeToggle } from "../ThemeToggle";
import { Typography } from "../ui/Typography";

export async function Header() {
  const session = await getAuthSession();
  const userId = session?.user.id;
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b mb-16 rounded-b-xl px-8">
      <div className=" w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center mr-8">
          <Image src="/images/logo.svg" width={50} height={35} alt="app logo" />

          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>
        <div className="flex flex-row gap-4">
          <Typography
            as={Link}
            variant={"link"}
            className="hover:text-foreground font-medium"
            href={"/explorer"}
          >
            Explorer
          </Typography>
          {session ? (
            <Typography
              as={Link}
              variant={"link"}
              className="hover:text-foreground font-medium"
              href={`/admin/user/${userId}/my-courses`}
            >
              Mes Cours
            </Typography>
          ) : null}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LoginLogoutContainer />

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
