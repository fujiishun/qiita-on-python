import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";

import { User } from "@/types/global";
import Alert from "@/components/common/error/alert";

interface UserEditFormProps {
  formData: User;
  isSubmitting: boolean;
  handleSubmit: (displayName: string) => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({
  formData,
  isSubmitting,
  handleSubmit,
}) => {
  const [localDisplayName, setLocalDisplayName] = useState(
    formData.displayName
  );
  const [showModal, setShowModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const validateForm = () => {
    if (!localDisplayName.trim()) {
      setErrorMessages(["表示名は入力必須です"]);
      return false;
    }
    setErrorMessages([]); // バリデーションエラーがない場合はエラーメッセージをクリア
    return true;
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUserEdit = () => {
    handleSubmit(localDisplayName);
    handleCloseModal();
  };

  return (
    <div>
      {errorMessages.length > 0 && <Alert messages={errorMessages} />}
      <Form>
        <FormGroup>
          <FormLabel>表示名</FormLabel>
          <FormControl
            type="text"
            name="displayName"
            value={localDisplayName}
            onChange={(e) => setLocalDisplayName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </FormGroup>
        <Button
          className="mt-4"
          type="button"
          variant="primary"
          onClick={() => {
            if (validateForm()) {
              handleShowModal();
            }
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner animation="border" size="sm" /> : "保存"}
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>表示名の変更の確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>表示名の変更を保存してもよろしいですか？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleUserEdit}>
            保存
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserEditForm;
