import LogoutButton from "@/components/features/login-logout-menu/logout-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getServerSession, Session } from "next-auth";
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

  const user = session.user;
  return (
    <>
      <Card className="w-full max-w-[500px] bg-neutral-900">
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
          <div className="leading-loose ">
            <p className="font-bold">{user?.email}</p>
            <p>{user?.name}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button className="bg-transparent" variant={"outline"}>
              Modifier le profil
            </Button>
            <Button className="bg-transparent" variant={"outline"}>
              Admin
            </Button>
          </div>
          <div className="flex flex-col items-end justify-end w-full mt-2">
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
