import { Progress } from "@prisma/client";
import { getLessonsWithProgressDetail } from "../../../../app/admin/courses/[name]/lessons/lesson.query";
import { LessonProgressIcon } from "./lesson-progress-icon";

type LessonItemProps = {
  courseName: string;
  userId: string;
};

export const LessonItem = async ({ courseName, userId }: LessonItemProps) => {
  const lessons = await getLessonsWithProgressDetail(courseName, userId);

  console.log("console log de lessons dans LessonItem : ", lessons);

  if (!lessons || lessons.length === 0) {
    return <div>Il n&apos;y a pas encore de leçons dans ce cours...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {lessons.map((lesson) => {
          const progress =
            lesson.users.length > 0
              ? lesson.users[0].progress
              : Progress.NOT_STARTED;
          return (
            <div
              key={lesson.id}
              className="flex flex-row gap-2 text-md px-4 py-2 border rounded-lg bg-background hover:bg-muted-foreground/10 items-center"
            >
              <LessonProgressIcon progress={progress} />
              <div>{lesson.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
