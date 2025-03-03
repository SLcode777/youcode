"use client";

import { Progress } from "@prisma/client";
import { useRouter } from "next/navigation";
import { LessonProgressIcon } from "./lesson-progress-icon";

type Lesson = {
  id: string;
  name: string;
  rank: string;
  progress: Progress;
};

type LessonsListProps = {
  lessons: Lesson[];
  courseName: string;
};

export default function LessonList({ lessons, courseName }: LessonsListProps) {
  const router = useRouter();

  const handleClick = (lessonRank: string) => {
    router.push(`/courses/${courseName}?lessonRank=${lessonRank}`);
  };

  return (
    <div className="flex flex-col gap-2 ">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => handleClick(lesson.rank)}
          className="flex flex-row gap-2 text-md px-4 py-2 border rounded-lg bg-background hover:bg-muted-foreground/10 items-center"
        >
          <LessonProgressIcon progress={lesson.progress} />
          <div>{lesson.name}</div>
        </div>
      ))}
    </div>
  );
}
