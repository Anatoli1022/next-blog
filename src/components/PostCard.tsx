import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { RichText } from "./RichText";
import { Content } from "@prismicio/client";

export const PostCard = ({
  post,
}: {
  post: Content.BlogPostDocument;
}): JSX.Element => {
  const { data } = post;

  return (
    <PrismicNextLink
      document={post}
      className="grid grid-cols-2 gap-10 border-b border-solid border-gray-200 w-full col-span-2 last:border-none"
    >
      <PrismicNextImage
        field={data.featured_image}
        sizes="100vw"
        className="w-full max-w-sm max-h-60 rounded-xl object-cover"
        fallbackAlt=""
      />
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-1">
          <p className="text-sm opacity-75 text-slate-700 border-b-2 w-min pb-1">
            {new Date(data?.publication_date || "").toLocaleDateString()}
          </p>
          <ul className="flex gap-x-1 mt-2">
            {post.tags.map((item, i) => {
              return (
                <li
                  key={i}
                  className="px-2 py-1 rounded-2xl bg-indigo-300 text-xs"
                >
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
          <div className="hover:opacity-75 duration-300 ease-in-out transition-all">
            <h2 className="font-bold text-xl">
              <PrismicText field={data.title} />
            </h2>
          </div>
        </div>
        <RichText field={data.description} />
      </div>
    </PrismicNextLink>
  );
};
