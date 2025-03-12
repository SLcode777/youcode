"use server";

import { revalidatePath } from "next/cache";
import { updateUserProfile } from "../../app/admin/user/[id]/student.query";

export const updateUser = async (data: FormData, userId: string) => {
  if (!userId) {
    return;
  }
  const newName = data.get("userName")?.toString() || "";
  const newImage = data.get("userAvatar")?.toString() || "";

  await updateUserProfile(userId, newName, newImage)
    .then((user) => console.log("User updated :", user))

    .catch((error) => console.error("Erreur", error));

  revalidatePath("/account/edit");
};
