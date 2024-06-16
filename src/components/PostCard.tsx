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
      className='col-span-2 grid w-full grid-cols-2 gap-10 border-b border-solid border-gray-200 last:border-none'
    >
      <PrismicNextImage
        field={data.featured_image}
        sizes='100vw'
        className='max-h-60 w-full max-w-sm rounded-xl object-cover'
        width={364}
        height={240}
        fallbackAlt=''
      />
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <p className='w-min border-b-2 pb-1 text-sm text-slate-700 opacity-75'>
            {new Date(data?.publication_date || "").toLocaleDateString()}
          </p>
          <ul className='mt-2 flex flex-wrap gap-2'>
            {post.tags.map((item, i) => {
              return (
                <li key={i} className='rounded-2xl bg-indigo-300 px-2 py-1 text-xs'>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
          <div className='transition-all duration-300 ease-in-out hover:opacity-75'>
            <h2 className='text-xl font-bold'>
              <PrismicText field={data.title} />
            </h2>
          </div>
        </div>
        <RichText field={data.description} />
      </div>
    </PrismicNextLink>
  );
};
