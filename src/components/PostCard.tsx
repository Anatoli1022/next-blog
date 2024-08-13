import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { RichText } from "./RichText";
import { Content } from "@prismicio/client";

export const PostCard = ({ post }: { post: Content.BlogPostDocument }): JSX.Element => {
  const { data } = post;

  return (
    <PrismicNextLink
      document={post}
      className='col-span-2 grid w-full grid-cols-2 items-center gap-10 border-b border-solid border-gray-200 pb-3 last:border-none md:gap-4'
    >
      <PrismicNextImage
        field={data.featured_image}
        sizes='100vw'
        className='max-h-60 w-full max-w-sm rounded-xl object-cover'
        width={384}
        height={240}
        fallbackAlt=''
      />
      <div className='flex flex-col gap-3 md:gap-2'>
        <div className='flex flex-col gap-2'>
          <p className='w-min border-b-2 pb-1 text-sm text-slate-700 opacity-75 md:-order-2'>
            {new Date(data?.publication_date || "").toLocaleDateString()}
          </p>
          <ul className='flex flex-wrap gap-2 md:hidden'>
            {post.tags.map((item, i) => {
              return (
                <li key={i} className='rounded-2xl bg-indigo-300 px-2 py-1 text-xs'>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>

          <h2 className='text-2xl font-bold md:-order-1'>
            <PrismicText field={data.title} />
          </h2>
        </div>
        <div className='line-clamp-4 md:line-clamp-3'>
          <RichText field={data.description} />
        </div>
      </div>
    </PrismicNextLink>
  );
};
