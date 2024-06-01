import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import PostForm from "@/components/post/form";
import { createPost } from "@/api/post";
import { getLoginUserId } from "@/utils/userAuth";
import Navigate from "@/hooks/useNavigate";
import { PostData } from "@/types/post";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { goToTop } = Navigate();

  useEffect(() => {
    // ログイン状態をチェックする処理
    const userId = getLoginUserId();
    if (!userId) {
      goToTop();
    }
  }, []);

  const handleSubmit = async (createPostData: PostData) => {
    setTitle(createPostData.title);
    setBody(createPostData.body);

    try {
      await createPost(createPostData);
      goToTop();
      alert("記事が作成されました");
    } catch (error) {
      setErrorMessages(["システムエラー：記事の作成に失敗しました"]);
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md={5}>
          <h2 className="text-center mb-2">新規投稿</h2>
        </Col>
      </Row>
      <PostForm
        operation="create"
        initialPostData={{ title, body }}
        errorMessages={errorMessages}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreatePostPage;
