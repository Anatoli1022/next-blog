"use server";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { headers } from "next/headers";
import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import RegistrationForm from "@/components/RegistrationForm";
interface SignUpFormData {
  nickname: string;
  email: string;
  password: string;
}

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

  const signUp = async ({ nickname, email, password }: SignUpFormData) => {
    "use server";
    const supabase = createClientUser();
    const origin = headers().get("origin");

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
        <RegistrationForm signUp={signUp} searchParams={searchParams} />
      </div>
    </>
  );
}
