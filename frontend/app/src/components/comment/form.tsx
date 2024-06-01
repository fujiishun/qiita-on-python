import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import { createComment } from "@/api/comment";
import { CreateCommentData } from "@/types/comment";
import Alert from "@/components/common/error/alert";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [commentBody, setCommentBody] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const createCommentData: CreateCommentData = {
    postId: postId,
    body: commentBody,
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const validateForm = () => {
    if (!commentBody.trim()) {
      setErrorMessages(["コメントは入力必須です"]);
      return false;
    }
    setErrorMessages([]); // バリデーションエラーがない場合はエラーメッセージをクリア
    return true;
  };

  const handleCommentSubmit = async () => {
    try {
      await createComment(createCommentData);
      window.location.reload();
      alert("コメントを投稿しました。");
    } catch (error) {
      alert("コメントの投稿に失敗しました。");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div>
      <h5>コメントを投稿する</h5>
      {errorMessages.length > 0 && <Alert messages={errorMessages} />}
      <Form>
        <Form.Group>
          <Form.Control
            as="textarea"
            className="scrollable-textarea"
            rows={5}
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="primary"
            onClick={() => {
              if (validateForm()) {
                handleShowModal();
              }
            }}
          >
            投稿
          </Button>
        </div>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>コメントの確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>コメントを投稿してもよろしいですか？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleCommentSubmit}>
            投稿
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentForm;
