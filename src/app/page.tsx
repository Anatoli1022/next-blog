import { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import PostList from "@/components/PostList";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Index() {
  const client = createClient();

  const home = await client.getByUID("page", "home", {
    fetchOptions: {
      next: { revalidate: 3600 },
      // next: { revalidate: 0 },
    },
  });

  return <PostList />;
}
