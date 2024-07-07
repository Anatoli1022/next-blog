"use server";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const login = await client.getByUID("page", "login");

  return {
    title: prismic.asText(login.data.title),
    description: login.data.meta_description,
    openGraph: {
      title: login.data.meta_title || undefined,
      images: [
        {
          url: login.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Index({ searchParams }: { searchParams: { message: string } }) {
  const client = createClient();

  const login = await client.getByUID("page", "login", {
    fetchOptions: {
      next: { revalidate: 0 },
    },
  });

  const signIn = async (formData: FormData) => {
    "use server";

    const supabase = createClientUser();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return redirect(
        `/login?message=${encodeURIComponent("Sign-in failed. Please check your credentials and try again.")}`,
      );
    }

    return redirect("/");
  };

  return (
    <>
      <SliceZone slices={login.data.slices} components={components} />

      <div className='flex w-full flex-1 flex-col justify-center px-8 sm:max-w-md'>
        <form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center'>
          <label className='text-md' htmlFor='email'>
            Email
          </label>
          <input
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            name='email'
            placeholder='you@example.com'
            required
          />
          <label className='text-md mt-6' htmlFor='password'>
            Password
          </label>
          <input
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            type='password'
            name='password'
            placeholder='••••••••'
            required
          />
          <p className='mt-3 text-center'>
            Don't have an account yet?
            <Link href='/registration' className='px-1 text-indigo-400'>
              Register
            </Link>
            here.
          </p>
          <SubmitButton
            formAction={signIn}
            className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
            pendingText='Signing In...'
          >
            Sign In
          </SubmitButton>
          {searchParams?.message && <p className='mt-2 text-center text-red-600'>{searchParams.message}</p>}
        </form>
      </div>
    </>
  );
}
