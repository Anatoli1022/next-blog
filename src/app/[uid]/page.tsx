"use server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Comments } from "@/components/Comments";
// import { supabaseComments } from '@/lib/supabase/client';

import { CommentForm } from "@/components/CommentForm";
import { revalidatePath } from "next/cache";
import { createClientUser } from "@/lib/supabase/server";
import PostList from "@/components/PostList";
import Link from "next/link";

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("blog_post", params.uid).catch(() => notFound());

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

  const page = await client.getByUID("blog_post", params.uid).catch(() => notFound());

  // const comments = await supabaseComments

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

  const { slices, title, publication_date, description, featured_image, link_project, link_git, list_title, list } =
    page.data;

  return (
    <div className='flex w-full max-w-3xl flex-col gap-16'>
      <section className='flex flex-col gap-12'>
        <div>
          <div className='text-center'>
            <p className='m-auto w-min border-b-2 pb-1 opacity-75'>
              {new Date(publication_date || "").toLocaleDateString()}
            </p>

            <div className='mb-3 mt-5'>
              <RichText field={title} />
            </div>
          </div>
        </div>
        <PrismicNextLink field={link_project}>
          <PrismicNextImage
            field={featured_image}
            sizes='100vw'
            className='max-h-[450px] w-full max-w-3xl rounded-xl object-cover'
            fallbackAlt=''
            width={768}
            height={384}
          />
        </PrismicNextLink>

        <div>
          <RichText field={description} />

          <div className='mt-5'>
            <RichText field={list_title} />
          </div>

          <ul className='mt-6'>
            {list.map((item) => {
              return (
                <li className='mt-4 flex flex-col gap-y-2 first-of-type:mt-0'>
                  <RichText field={item.title} />
                  <RichText field={item.text} />
                  <RichText field={item.text2} />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div>
            <PrismicNextLink field={link_project} className='text-lg font-semibold transition hover:text-indigo-400'>
              Link to the website
            </PrismicNextLink>
          </div>

          <div>
            <PrismicNextLink field={link_git} className='text-lg font-semibold transition hover:text-indigo-400'>
              Link to the project in git
            </PrismicNextLink>
          </div>
        </div>
      </section>

      <SliceZone slices={slices} components={components} />
      <div>
        <Comments id={page.id} />
        {user ? (
          <CommentForm id={page.id} uid={page.uid} revalidate={revalidate} user={user?.email} />
        ) : (
          <div className='mt-4'>
            <Link href='registration' className='text-lg font-semibold transition hover:text-indigo-400'>
              Please Login for comment
            </Link>
          </div>
        )}
      </div>

      <div>
        <h2 className='text-3xl font-bold'>Recommended Posts</h2>
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
