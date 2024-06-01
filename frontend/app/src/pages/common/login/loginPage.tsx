import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import { login } from "@/api/auth";
import Navigate from "@/hooks/useNavigate";
import LoginForm from "@/components/common/login/form";
import Alert from "@/components/common/error/alert";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { goToTop } = Navigate();

  // フォームへの入力を感知する関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login(loginData);
    if (result.success) {
      setIsSubmitting(false);
      goToTop();
      window.location.reload();
    } else {
      setErrorMessages([
        result.message || "システムエラー：ログインに失敗しました。",
      ]);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md={5}>
          <h2 className="text-center mb-2">ログイン</h2>
        </Col>
      </Row>
      {errorMessages.length > 0 && <Alert messages={errorMessages} />}
      <LoginForm
        loginData={loginData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default LoginPage;
