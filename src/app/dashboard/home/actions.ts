import clientPromise from "../../../../lib/mongodb";
import type { User } from "../../../../types/users";

export async function getAllUsers() {
  return await clientPromise.collection("users").find().toArray() as unknown as User[];
}
