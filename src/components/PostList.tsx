import { createClient } from "@/prismicio";
import { PostCard } from "./PostCard";

export default async function PostList() {
  const client = createClient();

  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    fetchOptions: {
      next: { revalidate: 3600 },
    },

    limit: 3,
  });

  return (
    <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
