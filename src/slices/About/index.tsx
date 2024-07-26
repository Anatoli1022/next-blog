import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
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
      <ul>
        {slice.items.map((item) => {
          return (
            <li className='mt-5 first:mt-0'>
              <RichText field={item.title} />
              <RichText field={item.text}  />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default About;
