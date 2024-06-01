import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { Post, Comment } from "@/types/global";
import { getPostById } from "@/api/post";
import { getCommentsByPostId } from "@/api/comment";
import PostCard from "@/components/post/card";
import CommentCard from "@/components/comment/card";
import Navigate from "@/hooks/useNavigate";
import { getLoginUserId } from "@/utils/userAuth";
import { deletePostById } from "@/api/post";

const DetailPostPage = () => {
  const { goToEdit, goToTop, goToError } = Navigate();
  const { postId } = useParams();
  const loginUserId = getLoginUserId();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  // ページのロード時に投稿を読み込む
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const fetchedPost = await getPostById(postId);
          setPost(fetchedPost);
          setIsLoadingPost(false);
        } catch (error) {
          goToError();
        }
      }
    };
    fetchPost();
  }, []);

  // ページのロード時にコメントを読み込む
  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        try {
          const fetchedComments = await getCommentsByPostId(postId);
          setComments(fetchedComments);
          setIsLoadingComments(false);
        } catch (error) {
          goToError();
        }
      }
    };
    fetchComments();
  }, []);

  const handleEdit = () => {
    goToEdit();
  };

  const handleDelete = async () => {
    if (postId) {
      try {
        await deletePostById(postId);
        goToTop();
      } catch (error) {
        setErrorMessages(["システムエラー：投稿の削除に失敗しました"]);
      }
    }
  };

  const isLoaded = !isLoadingPost || isLoadingComments; // ロード状態を一つのフラグで管理

  return (
    <Container className="mt-3">
      {isLoaded && postId ? (
        <>
          <PostCard post={post} onDelete={handleDelete} onEdit={handleEdit} />
          <CommentCard comments={comments} postId={postId} />
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default DetailPostPage;
