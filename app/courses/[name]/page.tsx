import LessonList from "@/components/features/course-content-page/lesson-list";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { NotAuthenticatedCard } from "@/components/notAuth-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { LessonWithProgress } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getStudentCourseContent } from "../../admin/courses/[name]/course.query";
import { getLessonsWithProgressDetail } from "../../admin/courses/[name]/lessons/lesson.query";
import LessonContent from "./lessons/page";
import { Progress } from "@prisma/client";
import { Typography } from "@/components/ui/Typography";
import { MarkdownProse } from "@/components/features/markdown/markdown-prose";

export default async function CourseContentPage(props: {
  params: { name: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await Promise.resolve(props.params);
  const courseName = resolvedParams.name;

  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return <NotAuthenticatedCard />;
  }

  const course = await getStudentCourseContent(userId, courseName);

  const lessonsRaw = await getLessonsWithProgressDetail(courseName, userId);

  const lessons: LessonWithProgress[] = lessonsRaw.map((lesson) => ({
    ...lesson,
    progress:
      lesson.users && lesson.users.length > 0
        ? lesson.users[0].progress
        : Progress.NOT_STARTED,
  }));

  const searchParams = await props.searchParams;
  console.log(searchParams);

  if (!course) {
    return <p>No course found</p>;
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className="flex flex-row w-full justify-between border border-accent rounded-xl px-4 py-2">
          <div className="flex flex-row gap-4 items-center ">
            <Avatar>
              <AvatarFallback>{courseName.charAt(0)}</AvatarFallback>
              <AvatarImage
                className="w-24"
                src={course.logo ? course.logo : "/file.png"}
              />
            </Avatar>
            <LayoutTitle>{course.name}</LayoutTitle>
          </div>
          <div className="flex flex-row gap-4 items-center h-full ">
            <div className="flex flex-col gap-2 ">
              <div className="text-xs text-muted-foreground">
                Cours créé par
              </div>
              <div className="text-lg font-medium text-end">
                {course.creator?.name}
              </div>
            </div>
            <Avatar>
              <AvatarImage
                className="w-16 rounded-full"
                src={course.creator?.image ? course.creator.image : "/file.png"}
              />
            </Avatar>
          </div>
        </div>
        <hr />
      </LayoutHeader>
      <LayoutContent>
        <div className="flex flex-col gap-4 mb-4">
          <Typography variant="h3">Présentation</Typography>
          <MarkdownProse>{course.presentation}</MarkdownProse>
        </div>
      </LayoutContent>
      <div className="flex flex-row gap-2  w-full h-fit">
        <Card className=" w-1/3">
          <CardHeader>
            <CardTitle>Liste des leçons</CardTitle>
          </CardHeader>
          <CardContent>
            {course.creator ? (
              <LessonList lessons={lessons} courseName={course.name} />
            ) : null}
          </CardContent>
        </Card>
        <Card className="flex w-2/3 flex-col">
          <CardHeader>
            <CardTitle>Contenu de la leçon sélectionnée</CardTitle>
          </CardHeader>
          <CardContent>
            <LessonContent
              params={{ name: course.name }}
              searchParams={searchParams}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
