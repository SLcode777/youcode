import NextButton from "@/components/features/course-page-selector/next-button";
import PageSelector from "@/components/features/course-page-selector/page-selector";
import PreviousButton from "@/components/features/course-page-selector/previous-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
// import ClientChecker from "./client-check";
import Link from "next/link";
import { getCourse } from "./course.query";
import { UserRow } from "./user-row";

export default async function CoursePage(props: {
  params: { name: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getRequiredAuthSession();
  const searchParams = await props.searchParams;
  console.log("search Params de la page de cours : ", searchParams);
  const params = await props.params;
  console.log("params de la page de cours : ", params);

  if (!searchParams.page) {
    redirect(`/admin/courses/${params.name}?page=0`);
  }

  const page = Number(searchParams.page ?? 1);

  const course = await getCourse({
    courseName: params.name,
    userId: session.user.id,
    userPage: page,
  });

  if (!course) {
    return <p>no course found</p>;
  }

  //Calculation of the nb of users and nb of pages
  const totalUsers = course._count?.users ?? 0;
  const pageSize = 5;
  const totalPages = Math.ceil(totalUsers / pageSize);

  //Utils functions to display _count
  const userCount = () => {
    if (!totalUsers) return "Ce cours n'a aucun utilisateur";
    if (totalUsers === 1) return `1 utilisateur`;
    return `${totalUsers} utilisateurs`;
  };

  const lessonCount = () => {
    const countLessons = course._count?.lessons ?? 0;
    if (countLessons === 0) return "Ce cours ne contient pas encore de leçons";
    if (countLessons === 1) return `1 leçon`;
    return `${countLessons} leçons`;
  };

  const nbUser = userCount();
  const nbLessons = lessonCount();

  return (
    <>
      <div className="flex flex-row gap-4 mb-2">
        <Image
          src={course?.logo ?? "/file.svg"}
          alt="course logo"
          width={24}
          height={24}
        ></Image>
        <div className="text-xl font-extrabold ">{course?.name}</div>
      </div>
      <hr className="mb-4" />
      <div className="flex flex-col-reverse md:flex-row gap-2">
        <Card
          id="UserCard"
          className="bg-neutral-900 w-full md:w-2/3 h-[36dvh] flex flex-col"
        >
          <CardHeader>
            <CardTitle className="text-justify font-semibold text-lg">
              Liste des élèves
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="w-16">Avatar</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>

                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course ? (
                  course.users ? (
                    course.users.map((user) => (
                      <UserRow user={user} key={user.id} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        Aucun élève inscrit
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  "not found"
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex flex-row  gap-1">
            <PreviousButton currentPage={page} courseName={params.name} />
            <PageSelector
              currentPage={page}
              totalPages={totalPages}
              courseName={params.name}
            />
            <NextButton
              currentPage={page}
              totalPages={totalPages}
              courseName={params.name}
            />
          </CardFooter>
        </Card>
        <Card
          id="CourseInfoCard"
          className="bg-neutral-900 w-full md:w-1/3 flex flex-col"
        >
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row gap-4  m-auto text-justify">
                <Image
                  src={course?.logo ?? "/file.svg"}
                  alt="course logo"
                  width={48}
                  height={48}
                ></Image>
                <p className="self-center text-2xl font-semibold">
                  {course?.name}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className=" flex flex-col h-full justify-between">
            <div className="flex flex-col gap-1 mb-2 ">
              {course.state == "DRAFT" ? (
                <Badge className="w-fit mb-2" variant={"outline"}>
                  {course.state}
                </Badge>
              ) : (
                <Badge className="w-fit mb-2" variant={"default"}>
                  {course.state}
                </Badge>
              )}

              <div className="font-normal">{nbUser}</div>
              <div className="font-normal">{nbLessons}</div>
            </div>
            <div className="font-light italic align-top h-full">
              {course.presentation}
            </div>
            <div className="flex flex-col mt-4 w-full gap-2">
              <Link
                href={`/admin/courses/${course.name}/edit`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Modifier le cours
              </Link>
              <Link
                href={`/admin/courses/${course.name}/lessons`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Modifier les leçons
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <ClientChecker users={course.users} /> */}
    </>
  );
}
