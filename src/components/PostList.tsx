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
    <section className='flex w-full max-w-3xl flex-col gap-8'>
      <h2 className='text-3xl font-bold'>Recommended Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
