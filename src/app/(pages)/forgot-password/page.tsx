import { headers } from "next/headers";
import { createClientUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ForgotPassword from "@/components/ForgotPassword";
interface ForgotPasswordProps {
  email: string;
}
export default async function Index({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createClientUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const confirmReset = async ({ email }: ForgotPasswordProps) => {
    "use server";

    const origin = headers().get("origin");

    const supabase = createClientUser();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    });

    if (error) {
      return redirect("/forgot-password?message=Could not authenticate user");
    }

    return redirect("/confirm?message=Password Reset link has been sent to your email address");
  };

  return (
    <div className='flex w-full max-w-lg flex-1 flex-col justify-center px-8'>
      <ForgotPassword confirmReset={confirmReset} />
    </div>
  );
}
