import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { NotAuthenticatedCard } from "@/components/notAuth-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getStudent } from "../../admin/user/[id]/student.query";

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function EditAccountPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { error } = searchParams;
  const session = await getRequiredAuthSession();

  if (!session) {
    return <NotAuthenticatedCard />;
  }

  const userId = session.user.id;

  if (!userId) {
    return <p>Not found</p>;
  }

  const user = await getStudent(userId);
  const name = user?.name;
  const image = user?.image;

  console.log({ user });

  const updateUser = async (formData: FormData) => {
    "use server";
    const userSession = await getRequiredAuthSession();
    const userId = userSession?.user.id;
    const name = formData.get("name");
    const image = formData.get("image");

    const safeData = FormSchema.safeParse({ name, image });

    console.log("console log de safeData", safeData);

    if (!safeData.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        "error",
        "données invalides. Le nom d'utilisateur doit être une chaîne de caractères entre 3 et 40 max. L'avatar doit être une URL valide."
      );
      redirect(`/account/edit?${searchParams.toString()}`);
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: safeData.data,
    });

    revalidatePath("/account");
    redirect("/account");
  };

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Mon compte</LayoutTitle>
        <hr />
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="flex flex-col p-4">
            <form action={updateUser} className="gap-4 flex flex-col">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="">
                  Nom d&apos;utilisateur{" "}
                </label>
                <Input
                  defaultValue={name ? name : "nom"}
                  id="name"
                  name="name"
                  className="border border-muted rounded-lg bg-muted px-4 py-2"
                />
              </div>{" "}
              <div className="flex flex-col gap-1">
                <label htmlFor="image" className="">
                  URL de mon avatar
                </label>
                <Input
                  defaultValue={image ? image : "url"}
                  id="image"
                  name="image"
                  className="border border-muted rounded-lg bg-muted px-4 py-"
                />
              </div>
              {error && <Typography>Error: {error as string}</Typography>}
              <Button
                type="submit"
                className="mt-2 w-full py-5"
                variant={"outline"}
              >
                Mettre à jour
              </Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
