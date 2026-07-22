import { memo } from 'react';
type ClientCardCommentProps = {
  comment?: string;
  className?: string;
};

function ClientCardCommentBase({ comment, className = 'client-card-comment' }: ClientCardCommentProps) {
  if (!comment) return null;

  return (
    <span className={className} title={comment}>
      {comment}
    </span>
  );
}

const ClientCardComment = memo(ClientCardCommentBase);
export default ClientCardComment;
