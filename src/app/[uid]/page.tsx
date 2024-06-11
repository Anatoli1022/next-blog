"use server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Comments } from "@/components/Comments";
// import { supabaseComments } from '@/lib/supabase/client';
import { createClientComments } from "@/lib/supabase/client";
import { CommentForm } from "@/components/CommentForm";
import { revalidatePath } from "next/cache";
import { createClientUser } from "@/lib/supabase/server";
import PostList from "@/components/PostList";
import Link from "next/link";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const revalidate = (url: string) => {
    "use server";
    revalidatePath(url, "page");
  };

  const client = createClient();

  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  // const comments = await supabaseComments
  const supabase = createClientComments();
  const comments = await supabase
    .from("comments")
    .select("post_id, nickname, payload, created_at, id, published, email")
    .eq("post_id", page.id)
    .order("created_at", { ascending: true });

  const supabaseUser = createClientUser();

  const {
    data: { user },
  } = await supabaseUser.auth.getUser();

  // const comments = await supabase
  //   .from('comments')
  //   .select('post_id, nickname, payload, created_at, id, published, email')
  //   .eq('post_id', page.id)
  //   .eq('published', true) // only fetch published comments
  //   .order('created_at', { ascending: true });

  const { slices, title, publication_date, description, featured_image } =
    page.data;

  return (
    <div className="flex flex-col gap-16 w-full max-w-3xl">
      <section className="flex flex-col gap-12">
        <div>
          <div className="text-center">
            <p className="opacity-75 border-b-2 w-min pb-1 m-auto">
              {new Date(publication_date || "").toLocaleDateString()}
            </p>

            <div className="mt-5 mb-3">
              <RichText field={title} />
            </div>
            <RichText field={description} />
          </div>
        </div>
        <PrismicNextImage
          field={featured_image}
          sizes="100vw"
          className="w-full max-w-3xl max-h-96 rounded-xl object-cover"
          fallbackAlt=""
        />
      </section>

      <SliceZone slices={slices} components={components} />
      <div>
        <Comments comments={comments.data} />
        {user ? (
          <CommentForm
            id={page.id}
            uid={page.uid}
            revalidate={revalidate}
            user={user?.email}
          />
        ) : (
          <div className="mt-4">
            <Link
              href="registration"
              className="text-lg font-semibold hover:text-indigo-400 transition"
            >
              Please Login for comment
            </Link>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-bold text-3xl">Recommended Posts</h2>
        <PostList />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
