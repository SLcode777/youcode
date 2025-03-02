import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { NotAuthenticatedCard } from "@/components/notAuth-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getStudentCourseContent } from "../../admin/courses/[name]/course.query";

export default async function CourseContentPage({
  params,
}: {
  params: { name: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const courseName = resolvedParams.name;

  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return <NotAuthenticatedCard />;
  }

  const course = await getStudentCourseContent(userId, courseName);

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
            <div className="text-lg font-medium">{course.creator?.name}</div>
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
      <LayoutContent>{course.presentation}</LayoutContent>
      <div className="flex flex-row gap-2  w-full h-fit">
        <Card className="bg-accent w-1/4">
          <CardHeader>
            <CardTitle>Liste des leçons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            {course.lessons.length === 0 ? (
              <p>No lessons yet</p>
            ) : (
              <div className="flex flex-col gap-2 ">
                {course.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="text-md px-4 py-2 border rounded-lg bg-background hover:bg-muted-foreground/10"
                  >
                    {lesson.name}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex w-3/4">
          <CardHeader>
            <CardTitle>Contenu de la leçon sélectionnée</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
}
