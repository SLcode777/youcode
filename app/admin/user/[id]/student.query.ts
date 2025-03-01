import prisma from "@/lib/prisma";

export const getStudent = async (userId: string) => {
  const student = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      accounts: true,
      CourseOnUser: true,
      LessonOnUser: true,
    },
  });
  return student;
};
