import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { PrismicNextImage } from '@prismicio/next';
import { PostCard } from '@/components/PostCard';
import { RichText } from '@/components/RichText';
import { Navigation } from '@/components/Navigation';
import { Comments } from '@/components/Comments';
import { supabase } from '@/lib/supabase/server';
type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID('blog_post', params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  const page = await client
    .getByUID('blog_post', params.uid)
    .catch(() => notFound());

  const posts = await client.getAllByType('blog_post', {
    predicates: [prismic.filter.not('my.blog_post.uid', params.uid)],
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    limit: 2,
  });

  const comments = await supabase
    .from('comments')
    .select('post_id, nickname, payload, created_at, id, published, email')
    .eq('post_id', page.id)
    .order('created_at', { ascending: true });

  // const comments = await supabase
  //   .from('comments')
  //   .select('post_id, nickname, payload, created_at, id, published, email')
  //   .eq('post_id', page.id)
  //   .eq('published', true) // only fetch published comments
  //   .order('created_at', { ascending: true });

  const { slices, title, publication_date, description, featured_image } =
    page.data;

  return (
    <div className="flex flex-col gap-12 w-full max-w-3xl">
      <Navigation client={client} />

      <section className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex flex-col gap-6 items-center">
            <p className="opacity-75 border-b-2 w-min pb-1">
              {new Date(publication_date || '').toLocaleDateString()}
            </p>
            <div className="text-center">
              <RichText field={title} />
            </div>
          </div>
          <div className="text-center">
            <RichText field={description} />
          </div>
        </div>
        <PrismicNextImage
          field={featured_image}
          sizes="100vw"
          className="w-full max-w-3xl max-h-96 rounded-xl object-cover"
        />
      </section>

      <SliceZone slices={slices} components={components} />
      <Comments id={page.id} uid={page.uid} comments={comments.data} />

      <h2 className="font-bold text-3xl">Recommended Posts</h2>
      <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <Navigation client={client} />
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('blog_post');

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
