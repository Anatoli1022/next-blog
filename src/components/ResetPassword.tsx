"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaResetPassword } from "@/schema/schema";
import { SubmitButton } from "./Submit-button";
import { useState } from "react";
import Image from "next/image";
import imageShow from "@/assets/eye-show.svg";
import imageHide from "@/assets/eye-hide.svg";

interface ResetPasswordProps {
  resetPassword: (helpers?: any) => any;
}

interface Value {
  password: string;
  repeatPassword: string;
}

const ResetPassword = ({ resetPassword }: ResetPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Formik
      initialValues={{ password: "", repeatPassword: "" }}
      validationSchema={validationSchemaResetPassword}
      onSubmit={(value: Value, { setSubmitting }) => {
        resetPassword(value).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className='animate-in text-foreground flex w-full flex-1 flex-col justify-center'>
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
          <label className='text-md mt-4' htmlFor='repeatPassword'>
            Repeat Password
          </label>
          <Field
            className='mt-3 rounded-md border bg-inherit px-4 py-2'
            name='repeatPassword'
            type='password'
            autoComplete='repeatPassword'
            id='repeatPassword'
            placeholder='••••••••'
          />
          <ErrorMessage name='repeatPassword' component='div' className='mt-1 text-red-600' />
          <SubmitButton
            isSubmitting={isSubmitting}
            className='text-foreground mt-6 rounded-md border bg-indigo-400 px-4 py-2 text-white transition hover:bg-inherit hover:text-black'
            pendingText='Sending...'
          >
            Reset your Password
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
