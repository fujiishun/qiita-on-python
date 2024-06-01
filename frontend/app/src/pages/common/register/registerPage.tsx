import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import { register } from "@/api/auth";
import RegisterForm from "@/components/common/register/form";
import RegistedAlert from "@/components/common/register/registedAlert";
import Alert from "@/components/common/error/alert";

const RegisterPage = () => {
  const [postData, setPostData] = useState({
    loginId: "",
    displayName: "",
    password: "",
    confirmationPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (postData.password !== postData.confirmationPassword) {
      setErrorMessages(["パスワードと確認用パスワードが一致していません。"]);
      setIsSubmitting(false);
      return;
    }

    const result = await register({
      loginId: postData.loginId,
      displayName: postData.displayName,
      password: postData.password,
      confirmationPassword: postData.confirmationPassword,
    });

    if (result.success) {
      setIsRegistered(true);
    } else {
      setErrorMessages([
        result.message || "システムエラー：登録に失敗しました。",
      ]);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      {isRegistered ? (
        <RegistedAlert />
      ) : (
        <div>
          <Row className="justify-content-center">
            <Col md={5}>
              <h2 className="text-center mb-2">新規登録</h2>
            </Col>
          </Row>
          {errorMessages.length > 0 && <Alert messages={errorMessages} />}
          <RegisterForm
            registerData={postData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
