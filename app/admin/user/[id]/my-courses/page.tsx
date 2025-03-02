import { Layout, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import { getStudentCoursesList } from "../../../courses/[name]/course.query";
import CourseCard from "../../../courses/course-card";

export default async function MyCoursePage() {
  const session = getRequiredAuthSession();
  const userId = (await session).user.id;

  const courses = await getStudentCoursesList({
    userId: userId,
  });

  console.log("liste des cours d'un étudiant :", courses);

  if (!courses) return <p>no courses found</p>;

  return (
    <Layout className="flex flex-col">
      <LayoutHeader>
        <LayoutTitle>Mes cours</LayoutTitle>
      </LayoutHeader>
      <hr />
      <div className="grid grid-grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            courseTitle={course.name}
            courseLogo={course.logo ? course.logo : "/file.png"}
            courseAuthorAvatar={
              course.creator?.image ? course.creator.image : "/file.png"
            }
            courseAuthorName={
              course.creator?.name ? course.creator.name : "Auteur Inconnu"
            }
            courseUrl={`/courses/${course.name}`}
          />
        ))}
      </div>
    </Layout>
  );
}
