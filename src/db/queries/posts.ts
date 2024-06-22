import type { Post } from "@prisma/client";
import { db } from "@/db";

// export type PostWithData = Post & {
//   topic: { slug: string };
//   user: { name: string | null };
//   _count: { comments: number };
// };

//Alternative easy approach
export type PostWithData = Awaited<
  ReturnType<typeof fetchDataByTopicSlug>
>[number];

export function fetchDataByTopicSlug(slug: string) {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopPosts() {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}

export function fetchPostsBySearchTerm(term: string) {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function countPostsByUserId(userId: string): Promise<number> {
  return db.post.count({ where: { userId: userId } });
}
