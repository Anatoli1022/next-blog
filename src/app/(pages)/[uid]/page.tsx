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

  const supabaseUser = createClientUser();

  const {
    data: { user },
  } = await supabaseUser.auth.getUser();

  const {
    slices,
    title,
    publication_date,
    description,
    featured_image,
    link_project,
    link_git,
    list_title,
    list,
    image_git,
    image_web,
  } = page.data;

  return (
    <div className='flex w-full max-w-3xl flex-col gap-16 md:gap-12'>
      <section className='flex flex-col gap-12 md:gap-6'>
        <div className='text-center'>
          <p className='m-auto w-min border-b-2 pb-1 opacity-75'>
            {new Date(publication_date || "").toLocaleDateString()}
          </p>

          <div className='mt-5'>
            <RichText field={title} />
          </div>
        </div>

        <div>
          <PrismicNextLink field={link_project}>
            <PrismicNextImage
              field={featured_image}
              sizes='100vw'
              className='max-h-[450px] w-full max-w-3xl rounded-xl object-cover'
              fallbackAlt=''
              width={768}
              height={450}
              title="link to the project's web page"
            />
          </PrismicNextLink>
          <ul className='mt-6 flex flex-wrap justify-center gap-2 md:mt-4'>
            {page.tags.map((item, i) => {
              return (
                <li key={i} className='rounded-2xl bg-indigo-300 px-2 py-1 text-xs'>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>

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
        <div className='flex gap-x-5'>
          <PrismicNextLink field={link_project}>
            <PrismicNextImage field={image_web} width={42} height={42} title="link to the project's web page" />
          </PrismicNextLink>

          <PrismicNextLink field={link_git}>
            <PrismicNextImage field={image_git} width={42} height={42} title="link to the project's github" />
          </PrismicNextLink>
        </div>
      </section>

      <SliceZone slices={slices} components={components} />
      <div>
        <Comments id={page.id} />
        {user ? (
          <CommentForm
            id={page.id}
            uid={page.uid}
            revalidate={revalidate}
            nickname={user.user_metadata.nickname}
            email={user.email}
          />
        ) : (
          <div className='mt-4'>
            <Link href='login' className='text-lg font-semibold transition hover:text-indigo-400'>
              Please Login for comment
            </Link>
          </div>
        )}
      </div>

      <PostList />
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
