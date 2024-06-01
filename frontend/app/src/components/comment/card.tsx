import React from "react";
import { Card } from "react-bootstrap";

import CommentListCard from "@/components/comment/listCard";
import CommentForm from "@/components/comment/form";
import { Comment } from "@/types/global";
import { getLoginUserId } from "@/utils/userAuth";

interface CommentCardProps {
  comments: Comment[];
  postId: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comments, postId }) => {
  return (
    <Card className="my-4">
      <Card.Body>
        <Card.Title>コメント</Card.Title>
        <hr />
        {comments.length > 0 ? (
          <CommentListCard comments={comments} />
        ) : (
          <div>この記事にコメントはありません。</div>
        )}
        <hr />
        {getLoginUserId() && <CommentForm postId={postId} />}
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
