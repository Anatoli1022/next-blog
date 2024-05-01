import { isFilled } from '@prismicio/client';
import { PrismicLink } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { createClientUser } from '@/lib/supabase/server';

import { redirect } from 'next/navigation';
import Link from 'next/link';
export const Navigation = async () => {
  const client = createClient();
  const navigation = await client.getSingle('navigation');
  const supabase = createClientUser();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClientUser();
    await supabase.auth.signOut({ scope: 'local' });
    return redirect('/registration');
  };



  return (
    <header className="py-5 ">
      <div className="flex justify-between">
        <nav>
          <ul className="flex gap-x-6">
            {isFilled.group(navigation.data.menu_items) &&
              navigation.data.menu_items.map((item) => {
                return (
                  <li key={item.label}>
                    <PrismicLink
                      field={item.link}
                      className="font-bold text-xl "
                    >
                      {item.label}
                    </PrismicLink>
                  </li>
                );
              })}
          </ul>
        </nav>

        {user ? (
          <div className="flex">
            <div className="flex items-center gap-4">Hey, {user.email}!</div>{' '}
            <form action={signOut}>
              <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/registration"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
