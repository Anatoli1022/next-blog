import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
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
        <RichText field={slice.primary.main_title} />
        <div className='mt-4'>
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

// navigation.data.list.map((item, i) => {
//   return (
//     <li key={i}>
//       <PrismicNextLink
//         field={item.item_link}
//         className='text-lg font-normal text-black transition hover:text-indigo-400'
//       >
//         <PrismicNextImage field={item.item_image} width={32} height={32} />
//       </PrismicNextLink>
//     </li>
//   );
// })}

export default About;
