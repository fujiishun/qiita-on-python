import React, { useState } from "react";
import { Card, Button, Badge, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Post } from "@/types/global";
import { buildUserDetailPagePath } from "@/utils/buildPath";
import { getLoginUserId } from "@/utils/userAuth"; // ログインユーザーの ID を取得する関数をインポート

interface PostCardProps {
  post: Post | null;
  onDelete: () => void;
  onEdit: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const loginUserId = getLoginUserId();

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditPost = () => {
    onEdit();
  };

  const handledeletePost = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <Card>
      {post ? (
        <Card.Body>
          <Link
            to={buildUserDetailPagePath(post.authorId.toString())}
            className="text-body text-decoration-none"
          >
            <Card.Subtitle>{post.authorName}</Card.Subtitle>
          </Link>
          <div className="d-flex justify-content-between">
            <Card.Text className="small text-muted mb-4">
              投稿日:
              {post.postedAt ? post.postedAt : "-"}
              {post.reWrittenAt && `｜更新日: ${post.reWrittenAt}`}
            </Card.Text>
            <div className="mt-1">
              {loginUserId === post.authorId && (
                <>
                  <Button
                    onClick={handleShowModal}
                    className="text-right small"
                    style={{ marginRight: "1rem" }}
                    variant="danger"
                    disabled={post.isDeleted}
                  >
                    削除
                  </Button>
                  <Button
                    className="text-right small"
                    variant="primary"
                    onClick={handleEditPost}
                    disabled={post.isDeleted}
                  >
                    編集
                  </Button>
                </>
              )}
            </div>
          </div>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text style={{ whiteSpace: "pre-wrap" }}>{post.body}</Card.Text>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            id="delete-post-modal"
            aria-labelledby="delete-post-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="delete-post-modal-title">
                記事を削除しますか？
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              削除した記事は復元できません。本当に削除しますか？
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                キャンセル
              </Button>
              <Button variant="danger" onClick={handledeletePost}>
                削除する
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      ) : (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      )}
    </Card>
  );
};

export default PostCard;
