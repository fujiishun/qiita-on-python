import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Comment } from "@/types/global";
import { getLoginUserId } from "@/utils/userAuth";
import { deleteComment } from "@/api/comment";

interface CommentListProps {
  comments: Comment[];
}

const CommentListCard: React.FC<CommentListProps> = ({ comments }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const handleShowModal = (commentId: string) => {
    setSelectedCommentId(commentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCommentDeleted = async () => {
    if (selectedCommentId) {
      try {
        await deleteComment(selectedCommentId);
        window.location.reload();
        alert("コメントを削除しました。");
      } catch (error) {
        alert("コメントの削除に失敗しました。");
      } finally {
        handleCloseModal();
      }
    }
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <div className="d-flex justify-content-between small">
            <p>{comment.commenterName}</p>
            <p>{comment.commentedAt}</p>
          </div>
          {comment.isDeleted ? (
            <p className="text-secondary">
              このコメントは投稿者によって削除されました。
            </p>
          ) : (
            <>
              <p style={{ whiteSpace: "pre-wrap" }}>{comment.body}</p>
              {getLoginUserId() === comment.commenterId && (
                <div className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleShowModal(comment.id.toString())} // 対象のコメントIDを渡す
                  >
                    削除
                  </Button>
                </div>
              )}
            </>
          )}
          {index !== comments.length - 1 && <hr />}
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>コメントを削除しますか？</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          削除したコメントは復元できません。本当に削除しますか？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            キャンセル
          </Button>
          <Button variant="danger" onClick={handleCommentDeleted}>
            削除する
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentListCard;
