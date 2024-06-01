import React from "react";
import { Card, Button } from "react-bootstrap";

import { User } from "@/types/global";

interface UserInformationCardProps {
  user: User;
  onEdit: () => void;
  isMe: Boolean;
}

const UserInformationCard: React.FC<UserInformationCardProps> = ({
  user,
  onEdit,
  isMe,
}) => {
  return (
    <Card>
      <Card.Header className="bg-white">ユーザー情報</Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <p>{user.displayName}</p>
          {isMe && (
            <Button variant="primary" onClick={onEdit} className="text-right">
              編集
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserInformationCard;
