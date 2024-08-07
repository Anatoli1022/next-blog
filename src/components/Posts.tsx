"use client";
import { createClient } from "@/prismicio";
import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import Pagination from "./Pagination";

const PostList = () => {
  const client = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [thisPage, setThisPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getByType("blog_post", {
          orderings: [
            { field: "my.blog_post.publication_date", direction: "desc" },
            { field: "document.first_publication_date", direction: "desc" },
          ],
          fetchOptions: {
            next: { revalidate: 3600 },
          },
          pageSize: 3,
          page: thisPage,
        });

        setPosts(response.results);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [client, thisPage]);

  const handlePreviousPage = () => {
    if (thisPage > 1) {
      setThisPage((prevState) => prevState - 1);
    }
  };

  const handleNextPage = () => {
    if (thisPage < totalPages) {
      setThisPage((prevState) => prevState + 1);
    }
  };

  return (
    <section className='grid w-full max-w-3xl grid-cols-1 gap-8'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <Pagination
        handlePreviousPage={handlePreviousPage}
        thisPage={thisPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
      />
    </section>
  );
};

export default PostList;