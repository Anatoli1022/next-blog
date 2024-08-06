import { createClient } from "@/prismicio";
import { PostCard } from "./PostCard";

interface PostListProps {
  limitPosts?: number | undefined;
}

export default async function PostList({ limitPosts }: PostListProps) {
  const client = createClient();

  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    fetchOptions: {
      next: { revalidate: 3600 },
    },

    limit: limitPosts,
  });

  return (
    <section className='grid w-full max-w-3xl grid-cols-1 gap-8'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
