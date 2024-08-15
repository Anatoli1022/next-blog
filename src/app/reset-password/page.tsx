"use server";
import { createClientUser } from "@/lib/supabase/server";
import ResetPassword from "@/components/ResetPassword";
import { redirect } from "next/navigation";

interface resetPasswordProps {
  password: string;
  resetPassword: string;
}

export default async function Index({ searchParams }: { searchParams: { message: string; code: string } }) {
  const supabase = createClientUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const resetPassword = async (values: resetPasswordProps) => {
    "use server";

    const { password } = values;

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
    <div className='flex w-full max-w-lg flex-1 flex-col justify-center px-8'>
      <ResetPassword resetPassword={resetPassword} />
      {searchParams?.message && (
        <p className='bg-foreground/10 text-foreground mt-4 p-4 text-center'>{searchParams.message}</p>
      )}
    </div>
  );
}
