import { Comment } from "@/types/global";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const AppRoutes: React.FC = () => {
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
