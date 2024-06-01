import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { LoginData } from "@/types/auth";

interface LoginFormProps {
  loginData: LoginData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginData,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Col md={5}>
          <FormGroup className="mb-3">
            <Form.Label className="mb-0">ログインID</Form.Label>
            <FormControl
              type="text"
              name="loginId"
              value={loginData.loginId}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label className="mb-0">パスワード</Form.Label>
            <FormControl
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </FormGroup>
          <div className="text-center mb-3">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              ログイン
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-2 justify-content-center">
        <Col md={5} className="text-center">
          <Link to="/users/register">新規登録</Link>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
