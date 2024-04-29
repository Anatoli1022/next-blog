import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import './styles.css';
import { Navigation } from '@/components/Navigation';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="any"
          href="https://prismic.io/favicon.ico"
        />
      </head>
      <body className="max-w-screen-xl ml-auto mr-auto">
        <Navigation />
        <div className="bg-white max-w-7xl min-h-screen p-12 w-full flex flex-col gap-20 items-center text-slate-700">
          {children} <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}
