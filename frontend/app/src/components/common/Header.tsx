import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navigate from "@/hooks/useNavigate";
import { isTokenExpired } from "@/utils/tokenExpired";
import { getLoginUserId, getLoginAccessToken } from "@/utils/userAuth";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
  const { goToTop } = Navigate();

  useEffect(() => {
    const loginUserId = getLoginUserId();
    if (loginUserId) {
      const access = getLoginAccessToken();
      // もしアクセストークンが期限切れの場合はログアウトさせる
      if (access && isTokenExpired(access)) {
        logout();
      } else {
        // 正常にログイン出来ている場合の処理
        setIsLoggedIn(true);
        setLoggedInUserId(loginUserId);
      }
    } else {
      setIsLoggedIn(false);
      setLoggedInUserId(null);
    }
  }, []);

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    goToTop();
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          Qiita_django
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to={`/users/${loggedInUserId}`}>
                  マイページ
                </Nav.Link>
                <Nav.Link as={Link} to="posts/new" className="me-2">
                  投稿する
                </Nav.Link>
                <Button variant="outline-light" onClick={logout}>
                  ログアウト
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="users/login">
                  ログイン
                </Nav.Link>
                <Nav.Link as={Link} to="users/register">
                  新規登録
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
