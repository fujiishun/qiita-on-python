import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spinner } from "react-bootstrap";

import { Post } from "@/types/global";
import PostForm from "@/components/post/form";
import { getPostById, updatePost } from "@/api/post";
import Navigate from "@/hooks/useNavigate";
import { getLoginUserId } from "@/utils/userAuth";
import { PostData } from "@/types/post";

const EditPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { goToPostDetail, goToTop, goToError } = Navigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const loggedInUserId = getLoginUserId();
        if (postId) {
          const postData = await getPostById(postId);
          // 未ログインの場合と自身の記事以外の場合はリダイレクト
          if (
            !loggedInUserId ||
            (postId &&
              loggedInUserId.toString() !== postData.authorId.toString())
          ) {
            goToTop();
            return;
          }
          setPost(postData);
        }
      } catch (error) {
        goToError();
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (updatePostData: PostData) => {
    if (postId) {
      try {
        await updatePost(postId, updatePostData);
        alert("投稿が更新されました");
        goToPostDetail(postId);
      } catch (error) {
        setErrorMessages(["システムエラー：投稿の更新に失敗しました"]);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md={5}>
          <h2 className="text-center mb-2">投稿編集</h2>
        </Col>
      </Row>
      {post ? (
        <PostForm
          operation="edit"
          initialPostData={{ title: post.title, body: post.body }}
          errorMessages={errorMessages}
          onSubmit={handleSubmit}
        />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPostPage;
