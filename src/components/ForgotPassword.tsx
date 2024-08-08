"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaForgotPassword } from "@/schema/schema";
import { SubmitButton } from "./Submit-button";


interface ResetPasswordProps {
  confirmReset: (email: { email: string }, helpers?: any) => any;
}
interface ForgotPassword {
  email: string;
}

const ForgotPassword = ({ confirmReset }: ResetPasswordProps) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchemaForgotPassword}
      onSubmit={(email: ForgotPassword, { setSubmitting }) => {
        confirmReset(email).finally(() => {
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
          />
          <ErrorMessage name='email' component='div' className='mt-1 text-red-600' />

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

export default ForgotPassword;
