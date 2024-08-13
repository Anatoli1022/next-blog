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
