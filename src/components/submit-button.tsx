"use client";

import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
  isSubmitting: boolean;
};

export function SubmitButton({ children, pendingText, isSubmitting, ...props }: Props) {
  return (
    <button {...props} type='submit' aria-disabled={isSubmitting}>
      {isSubmitting ? pendingText : children}
    </button>
  );
}
