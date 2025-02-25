import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
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
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function AdminCoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Liste des cours</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <hr />
          <Card className=" bg-neutral-900 mt-8">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="flex flex-row pt-4">
                    <TableHead className=" w-16">Logo</TableHead>
                    <TableHead>Nom du cours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id} className="flex flex-row ">
                      <Link href={`/admin/courses/${course.name}`}>
                        {courses ? (
                          <TableCell className="w-16">
                            <Image
                              src={course.logo ?? "/file.svg"}
                              alt={`logo`}
                              width={24}
                              height={24}
                            />
                          </TableCell>
                        ) : null}
                        <TableCell>{course.name}</TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
      {/* <div className="flex flex-row justify-between mb-2"> */}
      {/* <div className="text-xl font-extrabold place-self-end">Cours</div>
        <Button variant={"secondary"}>Nouveau Cours</Button>
      </div>
      <hr />
      <Card className="mt-4 bg-neutral-900">
        <CardContent></CardContent>
      </Card> */}
    </>
  );
}
