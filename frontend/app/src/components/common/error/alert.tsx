import React from "react";
import { Alert as BootstrapAlert, Row, Col } from "react-bootstrap";

interface AlertProps {
  messages: string[];
}

const Alert: React.FC<AlertProps> = ({ messages }) => {
  return (
    <Row className="justify-content-center">
      <Col md={5}>
        <BootstrapAlert variant="warning" className="text-center">
          {messages.map((message, index) => (
            <p key={index} className="my-1">
              {message}
            </p>
          ))}
        </BootstrapAlert>
      </Col>
    </Row>
  );
};

export default Alert;
