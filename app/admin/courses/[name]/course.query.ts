import { CourseState } from "@prisma/client";
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

export const getCoursesList = async ({ state }: { state: CourseState }) => {
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

  console.log("coursesList query :", courses);
  return courses;
};
