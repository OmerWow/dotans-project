"use server";

import { redirect } from "next/navigation";
import clientPromise from "../../lib/mongodb";

export async function LogUserIn(prevState: string, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await clientPromise
    .collection("users")
    .findOne({ email, password });

  if (user) {
    return redirect("/dashboard/home");
  }

  return "שם משתמש או סיסמא שגויים";
}
