import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import UserInformationCard from "@/components/user/informationCard";
import PostListCard from "@/components/post/listCard";
import { User, Post } from "@/types/global";
import { fetchUserPostsById } from "@/api/post";
import { fetchUserDataById } from "@/api/user";
import Navigate from "@/hooks/useNavigate";
import { getLoginUserId } from "@/utils/userAuth";

const UserProfilePage = () => {
  const { userId } = useParams();
  const { goToEdit, goToError } = Navigate();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isEmptyPosts, setIsEmptyPosts] = useState(true);
  const [isLoadingFirstPagePosts, setIsLoadingFirstPagePosts] = useState(false);
  const [isLoadingNextPagePosts, setIsLoadingNextPagePosts] = useState(false);
  const [isNoMorePosts, setIsNoMorePosts] = useState(false);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const userData = await fetchUserDataById(userId);
          setUser(userData);
          const loginUserId = getLoginUserId();
          if (loginUserId && loginUserId.toString() == userId) {
            setIsMe(true);
          }
          setIsUserLoaded(true);
        }
      } catch (error) {
        goToError();
      }
    };

    const fetchUserPosts = async () => {
      setIsLoadingFirstPagePosts(true);
      try {
        if (userId) {
          const userPosts = await fetchUserPostsById(userId);
          setPosts(userPosts);
          setIsEmptyPosts(userPosts.length === 0);
        }
      } catch (error) {
        goToError();
      }
      setIsLoadingFirstPagePosts(false);
    };

    setIsEmptyPosts(false);
    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  const handleEdit = () => {
    goToEdit();
  };

  const getNextPagePosts = () => {
    setIsLoadingNextPagePosts(true);
    setTimeout(() => {
      setIsLoadingNextPagePosts(false);
      setIsNoMorePosts(true);
    }, 2000);
  };

  return (
    <Container>
      {isUserLoaded && user && (
        <>
          <UserInformationCard user={user} onEdit={handleEdit} isMe={isMe} />
          <Card className="mt-4 bg-white">
            <Card.Header className="bg-white">記事</Card.Header>
            <Card.Body>
              {isEmptyPosts ? (
                <div>投稿された記事はありません。</div>
              ) : (
                <>
                  <PostListCard showAuthor={false} posts={posts} />
                  <div className="text-center my-4">
                    {isLoadingNextPagePosts ? (
                      <Spinner animation="border" />
                    ) : isNoMorePosts ? (
                      <p>記事は以上になります。</p>
                    ) : (
                      <Button onClick={getNextPagePosts}>もっと読む</Button>
                    )}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default UserProfilePage;
