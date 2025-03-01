import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import { getLessons } from "./lesson.query";

export default async function AdminLessonsPage(props: {
  params: { name: string };
}) {
  const session = await getRequiredAuthSession();
  console.log("session const :", session);

  const { name: courseName } = await props.params;
  console.log("courseName dans lessons : ", courseName);

  const lessons = await getLessons(courseName, session.user.id);

  console.log("liste des leçons : ", lessons);

  if (!lessons) {
    return <div>no lesson found</div>;
  }

  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>{`Liste des leçons de ${courseName}`}</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <hr />
          <Card className=" bg-neutral-900 mt-8">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="flex flex-row pt-4 w-full justify-between px-4">
                    <TableHead className="font-bold text-lg ">
                      Titre de la leçon
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full gap-2">
                  {lessons.map((lesson) => (
                    <TableRow
                      key={lesson.id}
                      className="flex border border-border rounded-md w-full justify-between px-4 my-2"
                    >
                      <Link
                        href={`/admin/courses/${courseName}/lessons/${lesson.id}`}
                      >
                        {lessons ? (
                          <TableCell className="align-middle font-semibold text-md  flex-1 ">
                            {lesson.name}
                          </TableCell>
                        ) : null}
                      </Link>
                      <div className="flex flex-row gap-8 align-middle items-center cursor-default ">
                        {lesson.state === "HIDDEN" ? (
                          <Badge variant={"outline"}>{lesson.state}</Badge>
                        ) : lesson.state === "PUBLIC" ? (
                          <Badge variant={"secondary"}>{lesson.state}</Badge>
                        ) : (
                          <Badge className="h-fit" variant={"default"}>
                            {lesson.state}
                          </Badge>
                        )}

                        <Menu />
                      </div>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardContent>
              <Button variant={"secondary"} className="flex flex-row w-full">
                <Plus />
                <p>Créer une nouvelle leçon</p>
              </Button>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    </>
  );
}
