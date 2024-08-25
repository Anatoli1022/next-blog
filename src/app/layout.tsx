import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./styles.css";
import { Navigation } from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/png' sizes='any' href='https://prismic.io/favicon.ico' />
        <link
          rel='preload'
          as='image'
          href='https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=3840'
          imageSizes='100vw'
          imageSrcSet='https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=640 640w, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=750 750w, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=828 828 Вт, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=1080 1080 Вт, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=1200 1200 Вт, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=1920 1920w, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=2048 2048w, https://images.prismic.io/next-webblog/Zm8KbZm069VX1yQK_midas-min.jpg?auto=format%2Ccompress&fit=max&w=3840 3840w'
        />
      </head>
      <body className='ml-auto mr-auto max-w-7xl bg-gray-50'>
        <Navigation />
        <div className='mt-8 flex flex-col items-center gap-20 px-2 text-slate-700'>
          {children} <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}
