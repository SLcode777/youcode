import { MarkdownProse } from "@/components/features/markdown/markdown-prose";
import { getAuthSession } from "@/lib/auth";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { getFirstLessonNotCompleted } from "../../../admin/courses/[name]/lessons/lesson.query";

export default async function LessonContent(props: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { name: courseName } = props.params;

  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return;
  }

  const searchParams = props.searchParams;

  const lessonRank =
    searchParams.lessonRank ||
    (await getFirstLessonNotCompleted(courseName, userId));

  console.log("lessonRank: ", lessonRank);

  if (!searchParams.lessonRank) {
    redirect(`/courses/${courseName}?lessonRank=${lessonRank}`);
  }

  const markdownFilePath = path.join(
    process.cwd(),
    `app/admin/courses/[name]/lessons/content/${lessonRank}.md`
  );

  let markdownContent = "";
  try {
    markdownContent = await fs.readFile(markdownFilePath, "utf-8");
  } catch (error) {
    console.error("erreur de lecture du fichier Markdown : ", error);
    markdownContent = "Le contenu de cette leçon est indisponible.";
  }

  // console.log("md file path : ", markdownFilePath);
  // console.log("markdown content : ", markdownContent);

  return (
    <div>
      <div>lesson Rank = {lessonRank}</div>
      <MarkdownProse markdown={markdownContent} />
    </div>
  );
}
