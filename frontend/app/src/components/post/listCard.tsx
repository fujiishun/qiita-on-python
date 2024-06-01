import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  buildPostDetailPagePath,
  buildUserDetailPagePath,
} from "@/utils/buildPath";
import { Post } from "@/types/global";

interface ListCardProps {
  posts: Post[];
  showAuthor: boolean;
}

const ListCard: React.FC<ListCardProps> = ({ posts, showAuthor }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Card
          className={`mb-3 ${index !== 0 ? "mt-2" : ""} shadow rounded`}
          key={post.id}
        >
          <Card.Body>
            <div className="d-flex justify-content-between">
              {showAuthor && post.authorName && (
                <Link
                  to={buildUserDetailPagePath(post.authorId.toString())}
                  className="text-body text-decoration-none"
                >
                  <Card.Subtitle>{post.authorName}</Card.Subtitle>
                </Link>
              )}
              {post.isDraft && showAuthor && post.authorName && (
                <Badge bg="secondary" className="ms-auto">
                  非公開
                </Badge>
              )}
            </div>
            <div>
              <Card.Text className="small text-muted mb-2">
                投稿日:
                {post.postedAt ? post.postedAt : "-"}
                {post.reWrittenAt && `｜更新日: ${post.reWrittenAt}`}
                {post.isDraft && (!post.authorName || !showAuthor) && (
                  <Badge bg="secondary" className="ms-auto float-end">
                    非公開
                  </Badge>
                )}
              </Card.Text>
            </div>
            <Link
              to={buildPostDetailPagePath(post.id.toString())}
              className="text-body text-decoration-none"
            >
              <Card.Title>{post.title}</Card.Title>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ListCard;
