"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateContents = async (tagOrPath: string) => {
  console.log("tagOrPath", tagOrPath);

  if (tagOrPath.startsWith("/")) {
    revalidatePath(tagOrPath);
  } else {
    revalidateTag(tagOrPath);
  }
};
