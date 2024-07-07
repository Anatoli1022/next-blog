"use server";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { headers } from "next/headers";
import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const registration = await client.getByUID("page", "registration");

  return {
    title: prismic.asText(registration.data.title),
    description: registration.data.meta_description,
    openGraph: {
      title: registration.data.meta_title || undefined,
      images: [
        {
          url: registration.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Index({ searchParams }: { searchParams: { message: string } }) {
  const client = createClient();

  const registration = await client.getByUID("page", "registration", {
    fetchOptions: {
      next: { revalidate: 0 },
    },
  });

  // cookies();

  const signUp = async (formData: FormData) => {
    "use server";
    const supabase = createClientUser();
    const origin = headers().get("origin");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nickname = formData.get("nickname") as string;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          nickname: nickname,
        },
      },
    });

    if (error) {
      return redirect(`/registration?message=${encodeURIComponent("Sign-up failed. Please try again.")}`);
    }

    return redirect("/");
  };

  return (
    <>
      <SliceZone slices={registration.data.slices} components={components} />

      <div className='flex w-full flex-1 flex-col justify-center px-8 sm:max-w-md'>
        <form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center'>
          <label className='text-md' htmlFor='nickname'>
            Nickname
          </label>
          <input
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            name='nickname'
            placeholder='Kabachok153'
            required
          />
          <label className='text-md mt-6' htmlFor='email'>
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
          />{" "}
          <SubmitButton
            formAction={signUp}
            className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
            pendingText='Signing Up...'
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && <p className='text-center text-red-600'>{searchParams.message}</p>}
        </form>
      </div>
    </>
  );
}
