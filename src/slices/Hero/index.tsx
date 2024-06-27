import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";


export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section className='max-w-3xl' data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div>
        <RichText field={slice.primary.title} />

        <div className='mt-5'>
          <RichText field={slice.primary.description} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
