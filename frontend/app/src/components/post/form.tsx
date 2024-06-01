import React, { useState } from "react";
import { Button, Modal, Form, Container, Card } from "react-bootstrap";

import Alert from "@/components/common/error/alert";
import { PostData } from "@/types/post";

interface PostFormProps {
  operation: string;
  initialPostData: PostData;
  errorMessages: string[];
  onSubmit: (data: PostData) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  operation,
  initialPostData,
  errorMessages,
  onSubmit,
}) => {
  const [localTitle, setLocalTitle] = useState(initialPostData.title);
  const [localBody, setLocalBody] = useState(initialPostData.body);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    if (!localTitle.trim() || !localBody.trim()) {
      setErrors(["タイトルと本文は入力必須です"]);
      return false;
    }
    setErrors([]); // バリデーションエラーがない場合はエラーメッセージをクリア
    return true;
  };

  return (
    <Container>
      <div className="my-2">
        {/* バリデーションアラート */}
        {errors.length > 0 && <Alert messages={errors} />}
        {/* バックエンドのエラーメッセージ */}
        {errorMessages.length > 0 && <Alert messages={errorMessages} />}
      </div>
      <Card className="my-2">
        <Form className="py-2 px-4">
          <Form.Group>
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>内容</Form.Label>
            <Form.Control
              as="textarea"
              rows={20}
              value={localBody}
              onChange={(e) => setLocalBody(e.target.value)}
              required
            />
          </Form.Group>
          <div className="text-right mt-3">
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  if (validateForm()) {
                    onSubmit({
                      title: localTitle,
                      body: localBody,
                      isDraft: true,
                    });
                  }
                }}
              >
                非公開で保存
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (validateForm()) {
                    setShowModal(true);
                  }
                }}
              >
                {operation === "create" ? "投稿" : "更新"}
              </Button>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Body>
                投稿した記事は公開されます。投稿しますか？
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  キャンセル
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onSubmit({
                      title: localTitle,
                      body: localBody,
                      isDraft: false,
                    });
                    setShowModal(false);
                  }}
                >
                  {operation === "create" ? "投稿" : "更新"}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default PostForm;
