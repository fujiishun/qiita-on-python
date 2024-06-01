import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";

import { RegisterData } from "@/types/auth";

interface RegisterFormProps {
  registerData: RegisterData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  registerData,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Col md={5}>
          <FormGroup className="mb-3">
            <FormLabel className="mb-0">ログインID</FormLabel>
            <FormControl
              type="text"
              name="loginId"
              value={registerData.loginId}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            <FormText className="text-muted">
              ※一度登録すると変更できません。
            </FormText>
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-0">表示名</FormLabel>
            <FormControl
              type="text"
              name="displayName"
              value={registerData.displayName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            <FormText className="text-muted">※登録後も変更可能です。</FormText>
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-0">パスワード</FormLabel>
            <FormControl
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-0">パスワード（確認用）</FormLabel>
            <FormControl
              type="password"
              name="confirmationPassword"
              value={registerData.confirmationPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </FormGroup>
          <FormGroup className="text-center mt-3">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              登録
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
