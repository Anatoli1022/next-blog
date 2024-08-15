"use server";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

interface SignInFormData {
  email: string;
  password: string;
}

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

  const signIn = async ({ email, password }: SignInFormData) => {
    "use server";

    const supabase = createClientUser();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
      <div className='flex w-full max-w-lg flex-1 flex-col justify-center px-8'>
        <LoginForm signIn={signIn} searchParams={searchParams} />
      </div>
    </>
  );
}
