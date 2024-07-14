import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ResetPassword({ searchParams }: { searchParams: { message: string; code: string } }) {
  const supabase = createClientUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const resetPassword = async (formData: FormData) => {
    "use server";

    const password = formData.get("password") as string;
    const supabase = createClientUser();

    if (searchParams.code) {
      const supabase = createClientUser();
      const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code);

      if (error) {
        return redirect(`/reset-password?message=Unable to reset Password. Link expired!`);
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(`/reset-password?message=Unable to reset Password. Try again!`);
    }

    redirect(`/login?message=Your Password has been reset successfully. Sign in.`);
  };

  return (
    <div>
      <div className='mx-auto mt-4 w-full px-8 sm:max-w-md'>
        <form
          className='animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2'
          action={resetPassword}
        >
          <label className='text-md' htmlFor='password'>
            New Password
          </label>
          <input
            className='mb-6 rounded-md border bg-inherit px-4 py-2'
            type='password'
            name='password'
            placeholder='••••••••'
            required
          />
          <label className='text-md' htmlFor='password'>
            Confirm New Password
          </label>
          <input
            className='mb-6 rounded-md border bg-inherit px-4 py-2'
            type='password'
            name='confirmPassword'
            placeholder='••••••••'
            required
          />
          <button className='text-foreground mb-2 rounded-md bg-indigo-700 px-4 py-2'>Reset</button>

          {searchParams?.message && (
            <p className='bg-foreground/10 text-foreground mt-4 p-4 text-center'>{searchParams.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
