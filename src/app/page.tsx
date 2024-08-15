import { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Posts from "@/components/Posts";

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
      next: { revalidate: 0 },
    },
  });

  return (
    <div className='flex w-full max-w-3xl flex-col gap-5'>
      <SliceZone slices={home.data.slices} components={components} />
      <Posts />
    </div>
  );
}
