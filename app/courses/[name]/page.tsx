import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getStudentCourseContent } from "../../admin/courses/[name]/course.query";
import { NotAuthenticatedCard } from "@/components/notAuth-card";

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
        <LayoutTitle>{course.name}</LayoutTitle>
        <hr />
      </LayoutHeader>
      <LayoutContent>{course.presentation}</LayoutContent>
      <div className="flex flex-row gap-2">
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>Liste des leçons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {course.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="text-md px-4 py-2 border rounded-lg bg-background hover:bg-muted-foreground/10"
                >
                  {lesson.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contenu de la leçon sélectionnée</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
}
