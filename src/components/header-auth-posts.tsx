import { countPostsByUserId } from "@/db/queries/posts";
import { auth } from "@/auth";
export default async function HeaderAuthPosts() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const count = await countPostsByUserId(session.user.id);
  return <p>You have created {count} post(s)</p>;
}
