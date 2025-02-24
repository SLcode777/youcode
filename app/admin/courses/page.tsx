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
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const courses = await prisma.course.findMany({
  orderBy: {
    createdAt: "asc",
  },
});

export default function AdminCoursesPage() {
  return (
    <>
      <div className="flex flex-row justify-between mb-2">
        <div className="text-xl font-extrabold place-self-end">Cours</div>
        <Button variant={"secondary"}>Nouveau Cours</Button>
      </div>
      <hr />
      <Card className="mt-4 bg-neutral-900">
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
    </>
  );
}
