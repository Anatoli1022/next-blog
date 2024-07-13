import { createClientComments } from "@/lib/supabase/client";
interface Comment {
  created_at: string;
  id: number;
  nickname: string;
  payload: string;
  post_id: string;
  published: boolean;
}
interface CommentsProps {
  id: string;
}
export const revalidate = 0;
export async function Comments({ id }: CommentsProps) {
  const supabase = createClientComments();
  const comments = await supabase
    .from("comments")
    .select("post_id, nickname, payload, created_at, id, published, email")
    .eq("post_id", id)
    .order("created_at", { ascending: true });
  return (
    <div>
      {comments && comments.data && comments.data.length > 0 ? (
        <>
          <h4 className='text-lg'>What people are saying</h4>
          {comments.data.map((comment: Comment, index: number) => (
            <div className='mt-4 rounded-xl border border-indigo-300 p-6' key={index}>
              <div className='text-sm'>
                {`Posted by ${comment.nickname} on ${new Date(comment.created_at).toLocaleTimeString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}`}
              </div>
              <p className='mt-4'>{comment.payload}</p>
            </div>
          ))}
        </>
      ) : (
        <p className='rounded-xl border border-indigo-300 p-3'>There are no comments on this post yet, be the first!</p>
      )}
    </div>
  );
}
