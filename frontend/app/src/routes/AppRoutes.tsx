import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "@/components/common/Header";
import TopPage from "@/pages/user/topPage";
import LoginPage from "@/pages/common/login/loginPage";
import RegisterPage from "@/pages/common/register/registerPage";
import UserProfilePage from "@/pages/user/profilePage";
import UserEditPage from "@/pages/user/editPage";
import CreatePostPage from "@/pages/post/createPage";
import DetailPostPage from "@/pages/post/detailPage";
import EditPostPage from "@/pages/post/editPage";
import ErrorPage from "@/pages/common/error/errorPage";
import AuthModal from "@/components/common/authModal";

const AppRoutes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 環境変数から認証の必要性を判断
    const requireAuth = process.env.REACT_APP_BASIC_AUTH === "true";
    if (!requireAuth) {
      setIsAuthenticated(true); // 認証不要の場合は直ちに認証済みとする
      return;
    }

    const extraAuth = localStorage.getItem("extraAuth");
    setIsAuthenticated(!!extraAuth);
  }, []);

  const handleAuthenticate = (username: string, password: string) => {
    const adminUser = process.env.REACT_APP_BASIC_AUTH_USER;
    const adminPassword = process.env.REACT_APP_BASIC_AUTH_PASSWORD;

    if (username === adminUser && password === adminPassword) {
      localStorage.setItem("extraAuth", "true");
      setIsAuthenticated(true);
    } else {
      alert("誤った認証情報です。");
    }
  };

  if (!isAuthenticated) {
    return <AuthModal show={true} onAuthenticate={handleAuthenticate} />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="users/login" element={<LoginPage />} />
        <Route path="users/register" element={<RegisterPage />} />
        <Route path="users/:userId" element={<UserProfilePage />} />
        <Route path="users/:userId/edit" element={<UserEditPage />} />
        <Route path="posts/new" element={<CreatePostPage />} />
        <Route path="posts/:postId" element={<DetailPostPage />} />
        <Route path="posts/:postId/edit" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
