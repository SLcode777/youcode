import LogoutButton from "@/components/features/login-logout-menu/logout-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import clsx from "clsx";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[nextauth]";

export type AccountPageProps = {
  user: Session["user"] | null;
};

export default async function AccountPage(props: AccountPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = session?.user;
  return (
    <>
      <Card className="w-full max-w-lg m-auto bg-neutral-900">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="">
            <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
            {user.image && (
              <AvatarImage
                className="rounded-full"
                width={50}
                height={50}
                src={user?.image}
                alt={user?.name ?? "user picture"}
              />
            )}
          </Avatar>
          <div className="flex flex-col gap-2">
            <CardTitle>{user?.email}</CardTitle>
            <CardDescription>{user?.name}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Link
              href="/account/settings"
              className={clsx(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "bg-transparent"
              )}
            >
              Modifier le profil
            </Link>
            <Link
              href="/admin"
              className={clsx(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "bg-transparent"
              )}
            >
              Admin
            </Link>
          </div>
          <CardFooter className=" flex flex-row-reverse mt-2 p-0">
            <LogoutButton />
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
}
