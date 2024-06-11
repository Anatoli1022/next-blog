"use server";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { headers } from "next/headers";
import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
// import { cookies } from 'next/headers';

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

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const client = createClient();

  const registration = await client.getByUID("page", "registration", {
    fetchOptions: {
      next: { revalidate: 0 },
    },
  });

  // cookies();
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
      return redirect(`/registration?message=${encodeURIComponent("Sign-in failed. Please check your credentials and try again.")}`);
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";
    const supabase = createClientUser();
    const origin = headers().get("origin");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
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

      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-indigo-400 rounded-md px-4 py-2 text-foreground mb-2 text-white hover:text-black hover:bg-inherit border transition"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-indigo-400 hover:text-white transition"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="text-red-600  text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
