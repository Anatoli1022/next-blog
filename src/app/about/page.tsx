import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const about = await client.getByUID("page", "about");

  return {
    title: prismic.asText(about.data.title),
    description: about.data.meta_description,
    openGraph: {
      title: about.data.meta_title || undefined,
      images: [
        {
          url: about.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Index() {
  const client = createClient();

  const about = await client.getByUID("page", "about", {
    fetchOptions: {
      next: { revalidate: 6000 },
    },
  });

  return (
    <div className='mt-8 flex flex-col gap-5'>
      {about.data.meta_title}
      <SliceZone slices={about.data.slices} components={components} />
    </div>
  );
}
