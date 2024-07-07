"use client";
import { useState } from "react";
import { SubmitButton } from "./submit-button";
import Image from "next/image";
import imageShow from "@/assets/eye-password-show-svgrepo-com.svg";
import imageHide from "@/assets/eye-password-hide-svgrepo-com.svg";

interface RegistrationFormProps {
  signUp: (formData: FormData) => Promise<void>;
  searchParams: { message?: string };
}
const RegistrationForm = ({ signUp, searchParams }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
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
      <div className='relative'>
        <input
          className='mt-3 min-w-full rounded-md border bg-inherit px-4 py-2'
          type={showPassword ? "text" : "password"}
          name='password'
          placeholder='••••••••'
          required
        />
        <button type='button' className='absolute inset-y-5 right-2 w-6 opacity-80' onClick={togglePasswordVisibility}>
          {showPassword ? <Image src={imageHide} alt='' /> : <Image src={imageShow} alt='' />}
        </button>
      </div>
      <SubmitButton
        formAction={signUp}
        className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
        pendingText='Signing Up...'
      >
        Sign Up
      </SubmitButton>
      {searchParams?.message && <p className='text-center text-red-600'>{searchParams.message}</p>}
    </form>
  );
};

export default RegistrationForm;
