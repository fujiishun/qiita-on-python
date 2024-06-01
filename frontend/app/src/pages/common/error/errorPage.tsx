import React from "react";

import Alert from "@/components/common/error/alert";

const ErrorPage: React.FC = () => {
  const errorMessages = ["システムエラーが発生しました。"];

  return (
    <div>
      <Alert messages={errorMessages} />
    </div>
  );
};

export default ErrorPage;
