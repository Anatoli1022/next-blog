"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "@/schema/schema";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import Image from "next/image";
import imageShow from "@/assets/eye-password-show-svgrepo-com.svg";
import imageHide from "@/assets/eye-password-hide-svgrepo-com.svg";
interface SignInFormData {
  email: string;
  password: string;
}

interface RegistrationFormProps {
  signIn: (formData: SignInFormData) => Promise<void>;
  searchParams?: { message?: string };
}

const LoginForm = ({ signIn, searchParams }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values: SignInFormData, { setSubmitting }) => {
        console.log("Attempting sign in with:");
        signIn(values).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center'>
          <label className='text-md' htmlFor='email'>
            Email
          </label>
          <Field
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            name='email'
            autoComplete='email'
            id='email'
            placeholder='you@example.com'
            required
          />
          <ErrorMessage name='email' component='div' className='mt-1 text-red-600' />

          <div className='relative mt-6'>
            <label className='text-md' htmlFor='password'>
              Password
            </label>
            <Field
              autoComplete='password'
              id='password'
              name='password'
              className='mt-3 min-w-full rounded-md border bg-inherit px-4 py-2'
              type={showPassword ? "text" : "password"}
              placeholder='••••••••'
            />
            <button
              type='button'
              className='absolute inset-y-11 right-3 w-6 opacity-70'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Image src={imageHide} alt='' /> : <Image src={imageShow} alt='' />}
            </button>
          </div>
          <ErrorMessage name='password' component='div' className='mt-1 text-red-600' />
          <p className='mt-3 text-center'>
            Don't have an account yet?
            <Link href='/registration' className='px-1 text-indigo-400'>
              Register
            </Link>
            here.
          </p>
          <SubmitButton
            isSubmitting={isSubmitting}
            className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
            pendingText='Signing In...'
          >
            Sign In
          </SubmitButton>
          {searchParams?.message && <p className='mt-2 text-center text-red-600'>{searchParams.message}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
