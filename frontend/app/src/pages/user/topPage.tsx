import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl } from "react-bootstrap";

import ListCard from "@/components/post/listCard";
import { searchPosts } from "@/api/post";
import { Post } from "@/types/global";
import Navigate from "@/hooks/useNavigate";
import Alert from "@/components/common/error/alert";

const TopPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const { goToError } = Navigate();

  const fetchData = async (query = "") => {
    try {
      const posts: Post[] = await searchPosts(query);
      if (posts.length === 0) {
        setIsEmpty(true);
      } else {
        setPosts(posts);
        setIsEmpty(false);
      }
    } catch (error) {
      goToError();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // エンターキー押下時に検索を実行
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData(searchQuery);
    }
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="記事を検索"
          aria-label="検索キーワード"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      {isEmpty ? (
        <Alert messages={["投稿が見つかりません"]} />
      ) : (
        <ListCard posts={posts} showAuthor={true} />
      )}
    </Container>
  );
};

export default TopPage;
