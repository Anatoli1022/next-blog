"use client";
import { useState } from "react";

interface CommentsProps {
  id: string;
  uid: string;
  revalidate: (val: string) => void;
  text?: string;
  user: string | undefined;
}
export function CommentForm({ id, uid, revalidate, user }: CommentsProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    revalidate(`/${uid}`);

    if (user) {
      await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          nickname: user,
          email: user,
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
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="comment" className="mb-2 mt-6 text-lg block">
          Comment
        </label>

        <input
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className="w-full border p-2 rounded-lg"
          value={comment}
        />
      </div>

      <button
        className="mt-4 font-normal text-lg bg-indigo-400 text-white transition border border-xl rounded-md px-4 py-1 text-foreground hover:text-black hover:bg-inherit disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Send comment"}
      </button>
    </form>
  );
}
