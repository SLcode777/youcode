import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getLesson } from "../lesson.query";

export default async function LessonPage(props: { params: { id: string } }) {

  const { id: lessonId } = await props.params;
  console.log("destruct de lessonId:", lessonId);

  const lesson = await getLesson(lessonId);

  if (!lesson) {
    return <p>no lesson found</p>;
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>
      <hr />
      <LayoutContent>
        <div className="text-balance max-w-2xl text-justify">
          {lesson.content}
        </div>
      </LayoutContent>
    </Layout>
  );
}
