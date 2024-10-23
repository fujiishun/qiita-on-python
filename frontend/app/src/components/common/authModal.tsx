import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AuthModalProps {
  show: boolean;
  onAuthenticate: (username: string, password: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onAuthenticate }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    onAuthenticate(username, password);
  };

  return (
    <Modal show={show} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>閲覧には認証が必要です</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>ユーザ名：</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>パスワード：</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          認証
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
