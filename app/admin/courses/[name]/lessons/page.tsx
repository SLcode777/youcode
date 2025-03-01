import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu } from "lucide-react";
import Link from "next/link";
import { getLessons } from "./lesson.query";

export default async function AdminLessonsPage(props: {
  params: { name: string };
}) {
  const { name: courseName } = await props.params;
  console.log("courseName dans lessons : ", courseName);

  const lessons = await getLessons(courseName);

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
                    <TableHead className="font-bold text-lg">
                      Titre de la leçon
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                  {lessons.map((lesson) => (
                    <TableRow
                      key={lesson.id}
                      className="flex flex-row w-full justify-between px-4"
                    >
                      <Link
                        href={`/admin/courses/${courseName}/lessons/${lesson.id}`}
                      >
                        {lessons ? (
                          <TableCell className="align-middle font-semibold text-md ">
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
          </Card>
        </LayoutContent>
      </Layout>
    </>
  );
}
