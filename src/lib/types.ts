import { Progress, LessonState } from "@prisma/client";

export type LessonWithProgress = {
  id: string;
  name: string;
  createdAt: Date;
  state: LessonState;
  courseId: string;
  rank: string;
  content: string;
  progress: Progress;
}
