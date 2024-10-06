import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { PrismicText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className='text-center'>
        <h1 className='text-7xl font-bold'>
          <PrismicText field={slice.primary.main_title} />
        </h1>
        <h2 className='mt-2 text-4xl font-semibold'>
          <PrismicText field={slice.primary.title} />
        </h2>
        <div className='m-auto mt-2 w-full max-w-[280px]'>
          <span className='block h-[2px] w-full bg-indigo-400'></span>
          <span className='m-auto mt-1 block h-[2px] max-w-[200px] bg-indigo-400'></span>
        </div>
        <div className='mt-6'>
          <RichText field={slice.primary.text} />
        </div>
      </div>

      <ul className='mt-5 flex items-center justify-end gap-x-4'>
        {slice.items.map((item) => {
          return (
            <li>
              <PrismicNextLink field={item.link}>
                <PrismicNextImage field={item.image} width={32} height={32} />
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default About;
