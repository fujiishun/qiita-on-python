import React from "react";
import { Card } from "react-bootstrap";

import { User } from "@/types/global";

interface UserEditCardProps {
  user: User;
}

const UserEditCard: React.FC<UserEditCardProps> = ({ user }) => {
  return (
    <Card>
      <Card.Body>
        <h5>@{user.loginId}</h5>
        <hr />
      </Card.Body>
    </Card>
  );
};

export default UserEditCard;
