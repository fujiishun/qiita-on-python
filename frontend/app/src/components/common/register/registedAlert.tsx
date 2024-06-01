import React from "react";
import { Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegistedAlert = () => {
  return (
    <div>
      <Row className="justify-content-center">
        <Col md={5}>
          <Alert variant="success" className="text-center">
            <p>
              ユーザー登録に成功しました。
              <br />
              以下のリンク先よりログインしてください。
            </p>
          </Alert>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={5} className="text-center">
          <Link to="/users/login">ログイン画面へ</Link>
        </Col>
      </Row>
    </div>
  );
};

export default RegistedAlert;
