interface Comment {
  created_at: string;
  id: number;
  nickname: string;
  payload: string;
  post_id: string;
  published: boolean;
}
interface CommentsProps {
  comments: Comment[] | null;
  status: number;
}

export function Comments({ comments, status }: CommentsProps) {
  return (
    <div>
      {comments && status === 200 && comments.length > 0 ? (
        <>
          <h4 className='text-lg'>What people are saying</h4>
          {comments.map((comment: Comment, index: number) => (
            <div className='mt-4 border p-6' key={index}>
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
        <p>There are no comments on this post yet, be the first!</p>
      )}
    </div>
  );
}
