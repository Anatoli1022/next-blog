'use client';
import { useState } from 'react';
interface CommentsProps {
  id: string;
  uid: string;
}
export function CommentForm({ id, uid, }: CommentsProps) {
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        setComment('');
        setEmail('');
        setNickname('');
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="comment" className="mb-2 mt-6 text-lg block">
          Comment
        </label>
        <textarea
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className="w-full border p-4"
          value={comment}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 mt-6 text-lg block">
          Email
        </label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your email"
          className="w-full border p-4"
          value={email}
        />
      </div>
      <div>
        <label htmlFor="nickname" className="mb-2 mt-6 text-lg block">
          Nickname
        </label>
        <input
          id="nickname"
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          placeholder="Your nickname"
          className="w-full border p-4"
          value={nickname}
        />
      </div>
      <button
        className="p-4 bg-slate-700 text-white mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Send comment'}
      </button>
    </form>
  );
}
