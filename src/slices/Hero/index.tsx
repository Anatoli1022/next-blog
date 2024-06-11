import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicText } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { PrismicNextImage } from "@prismicio/next";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      className="flex flex-col gap-4 max-w-3xl w-full"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicNextImage
        field={slice.primary.image}
        sizes="100vw"
        className="w-full max-w-[100px] max-h-full rounded-md object-cover"
      />
      <div>
        <RichText field={slice.primary.title} />

        <RichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default Hero;
