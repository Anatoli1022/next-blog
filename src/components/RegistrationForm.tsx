"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaRegistration } from "@/schema/schema";
import { useState } from "react";
import { SubmitButton } from "./Submit-button";
import Image from "next/image";
import imageShow from "@/assets/eye-password-show-svgrepo-com.svg";
import imageHide from "@/assets/eye-password-hide-svgrepo-com.svg";
interface SignUpFormData {
  nickname: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  signUp: (formData: SignUpFormData) => Promise<void>;
  searchParams?: { message?: string };
}

const RegistrationForm = ({ signUp, searchParams }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{ nickname: "", email: "", password: "" }}
      validationSchema={validationSchemaRegistration}
      onSubmit={(values: SignUpFormData, { setSubmitting }) => {
        signUp(values).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center'>
          <label className='text-md' htmlFor='nickname'>
            Nickname
          </label>
          <Field
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            name='nickname'
            autoComplete='nickname'
            id='nickname'
            placeholder='Kabachok153'
          />
          <ErrorMessage name='nickname' component='div' className='mt-1 text-red-600' />

          <label className='text-md mt-5' htmlFor='email'>
            Email
          </label>
          <Field
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            name='email'
            autoComplete='email'
            id='email'
            placeholder='you@example.com'
            type='email'
          />
          <ErrorMessage name='email' component='div' className='mt-1 text-red-600' />

          <div className='relative mt-5'>
            <label className='text-md' htmlFor='password'>
              Password
            </label>
            <Field
              className='mt-3 min-w-full rounded-md border bg-inherit px-4 py-2'
              type={showPassword ? "text" : "password"}
              autoComplete='password'
              id='password'
              name='password'
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

          <SubmitButton
            className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
            pendingText='Signing Up...'
            isSubmitting={isSubmitting}
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && <p className='text-center text-red-600'>{searchParams.message}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
