"use client";
import { useState } from "react";
import { SubmitButton } from "./Submit-button";

interface CommentsProps {
  id: string;
  uid: string;
  revalidate: (val: string) => void;
  text?: string;
  nickname: string | undefined;
  email: string | undefined;
}
export function CommentForm({ id, uid, revalidate, nickname, email }: CommentsProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    revalidate(`/${uid}`);

    if (nickname) {
      await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          nickname,
          email,
          comment,
          uid,
        }),
      }).then((data: any) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setLoading(false);
          setComment("");
        }
      });
    } else {
    }
  };

  return (
    <form onSubmit={onSubmit} className='mt-6'>
      <div>
        <label htmlFor='comment' className='block text-lg'>
          Comment
        </label>

        <input
          id='comment'
          onChange={(e) => setComment(e.target.value)}
          placeholder='Your comment'
          className='mt-2 w-full rounded-lg border p-2'
          value={comment}
        />
      </div>

      <SubmitButton
        isSubmitting={loading}
        pendingText='Sending...'
        className='border-xl text-foreground mt-4 rounded-md border bg-indigo-400 px-4 py-1 text-lg font-normal text-white transition hover:bg-inherit hover:text-black disabled:cursor-not-allowed'
      >
        Send comment
      </SubmitButton>
    </form>
  );
}
