import { Layout, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { CourseState } from "@prisma/client";
import { getPublishedCoursesList } from "../admin/courses/[name]/course.query";
import CourseCard from "../admin/courses/course-card";

export default async function ExplorerPage() {
  const courses = await getPublishedCoursesList({
    state: CourseState.PUBLISHED,
  });
  console.log(courses);

  if (!courses) return <p>no courses found</p>;

  return (
    <Layout className="flex flex-col">
      <LayoutHeader>
        <LayoutTitle>Explorer les cours</LayoutTitle>
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
            courseUrl={`/admin/courses/${course.name}`}
          />
        ))}
      </div>
    </Layout>
  );
}
