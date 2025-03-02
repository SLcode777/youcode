import { CourseState, Prisma } from "@prisma/client";
import prisma from "../../../../src/lib/prisma";

export const getCourse = async ({
  courseName,
  userId,
  userPage,
}: {
  courseName: string;
  userId: string;
  userPage: number;
}) => {
  const course = await prisma.course.findFirst({
    where: {
      name: courseName,
      creatorId: userId,
    },
    select: {
      id: true,
      state: true,
      logo: true,
      name: true,
      presentation: true,
      users: {
        take: 5,
        skip: Math.max(0, userPage * 5),
        orderBy: {
          user: {
            createdAt: "asc",
          },
        },
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              name: true,
              id: true,
              email: true,
              image: true,
              createdAt: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = course?.users.map((user) => {
    return {
      canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...course,
    users,
  };
};

interface CourseProps {
  params: {
    courseName: string;
  };
}

export async function Course({ params }: CourseProps) {
  const courseName = params.courseName;
  const course = await prisma.course.findMany({
    where: {
      name: courseName,
    },
  });
  console.log("console detail du cours: ", course);
}

export const getPublishedCoursesList = async ({
  state,
}: {
  state: CourseState;
}) => {
  const courses = await prisma.course.findMany({
    where: {
      state: state,
    },
    select: {
      id: true,
      state: true,
      logo: true,
      name: true,
      presentation: false,
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return courses;
};

export type PublishedCoursesCard = Prisma.PromiseReturnType<
  typeof getPublishedCoursesList
>[number];

export const getStudentCoursesList = async ({ userId }: { userId: string }) => {
  const courses = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      CourseOnUser: true,

      course: {
        select: {
          id: true,
          name: true,
          logo: true,
          presentation: true,
          state: true,
          lessons: true,
          creator: true,
        },
      },
    },
  });

  return courses?.course;
};

export type StudendCoursesCard = Prisma.PromiseReturnType<
  typeof getStudentCoursesList
>[];

export const getStudentCourseContent = async (
  userId: string,
  courseName: string
) => {
  const enrollment = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      CourseOnUser: {
        where: {
          course: {
            name: courseName,
            state: CourseState.PUBLISHED,
          },
        },
        select: {
          course: {
            select: {
              id: true,
              name: true,
              logo: true,
              presentation: true,
              state: true,
              lessons: true,
              creator: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!enrollment || enrollment.CourseOnUser.length === 0) {
    return null;
  }

  return enrollment.CourseOnUser[0].course;
};
