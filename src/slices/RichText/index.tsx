import type { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps, JSXMapSerializer } from '@prismicio/react';

import { RichText } from '@/components/RichText';


const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
export default function RichTextSlice({ slice }: RichTextProps) {
  return (
    <section className="flex flex-col gap-2">
      <RichText field={slice.primary.content} />
    </section>
  );
}
