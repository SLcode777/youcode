import prisma from "@/lib/prisma";

export const getLessons = async (courseName: string) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      course: {
        name: courseName,
      },
    },
    orderBy: {
      rank: "asc",
    },
  });

  return lessons;
};

export const getLesson = async (lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
  });

  console.log(lesson);

  return lesson;
};
