"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "@/schema/schema";
import { useState } from "react";
import { SubmitButton } from "./submit-button";
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
      validationSchema={validationSchema}
      onSubmit={(values: SignUpFormData, { setSubmitting }) => {
        signUp(values).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      <Form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center'>
        <label className='text-md' htmlFor='nickname'>
          Nickname
        </label>
        <Field className='mt-3 rounded-md border bg-inherit px-4 py-2' name='nickname' placeholder='Kabachok153' />
        <ErrorMessage name='nickname' component='div' className='mt-1 text-red-600' />

        <label className='text-md mt-6' htmlFor='email'>
          Email
        </label>
        <Field
          className='mt-3 rounded-md border bg-inherit px-4 py-2'
          name='email'
          placeholder='you@example.com'
          type='email'
        />
        <ErrorMessage name='email' component='div' className='mt-1 text-red-600' />

        <label className='text-md mt-6' htmlFor='password'>
          Password
        </label>
        <div className='relative'>
          <Field
            className='mt-3 min-w-full rounded-md border bg-inherit px-4 py-2'
            type={showPassword ? "text" : "password"}
            name='password'
            placeholder='••••••••'
          />
          <button
            type='button'
            className='absolute inset-y-5 right-2 w-6 opacity-80'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Image src={imageHide} alt='' /> : <Image src={imageShow} alt='' />}
          </button>
        </div>
        <ErrorMessage name='password' component='div' className='mt-1 text-red-600' />

        <SubmitButton
          className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
          pendingText='Signing Up...'
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && <p className='text-center text-red-600'>{searchParams.message}</p>}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
