import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const updateUserProfile = async (
  userId: string,
  data: {
    newName: string;
    newImage: string;
  }
) => {
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: data,
  });

  revalidatePath("/account");
  redirect("/account");
  return updateUser;
};
