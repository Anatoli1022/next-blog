import { isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { createClientUser } from "@/lib/supabase/server";
import { PrismicNextLink } from "@prismicio/next";
import { redirect } from "next/navigation";
import Link from "next/link";

export const Navigation = async () => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const supabase = createClientUser();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClientUser();
    await supabase.auth.signOut({ scope: "local" });
    return redirect("/login");
  };

  return (
    <header className='px-2 py-5'>
      <nav className='flex items-center justify-between'>
        <ul className='flex gap-x-6'>
          {isFilled.group(navigation.data.menu_items) &&
            navigation.data.menu_items.map((item) => {
              return (
                <li key={item.label}>
                  <PrismicNextLink
                    field={item.link}
                    className='text-lg font-normal text-black transition hover:text-indigo-400'
                  >
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
        </ul>

        {user && user.user_metadata.nickname ? (
          <div className='flex'>
            <div className='mr-4 flex items-center'>Hey, {user.user_metadata.nickname!}</div>
            <form action={signOut}>
              <button className='border-xl text-foreground rounded-md border bg-indigo-400 px-4 py-1 text-lg font-normal text-white transition hover:bg-inherit hover:text-black'>
                <span>Logout</span>
              </button>
            </form>
          </div>
        ) : (
          <Link
            href='/login'
            className='border-xl text-foreground rounded-md border bg-indigo-400 px-4 py-1 text-lg font-normal text-white transition hover:bg-inherit hover:text-black'
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};
