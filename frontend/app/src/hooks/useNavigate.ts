// リダイレクト用の処理
import { useNavigate } from "react-router-dom";

const Navigate = () => {
  const navigate = useNavigate();

  const goToTop = () => navigate("/");
  const goToError = () => navigate("/error");
  const goToLogin = () => navigate("users/login");
  const goToRegister = () => navigate("users/register");
  const goToEdit = () => navigate("edit");
  const goToUserDetail = (userId: string) => navigate(`/users/${userId}`);
  const goToPostDetail = (postId: string) => navigate(`/posts/${postId}`);

  return {
    goToTop,
    goToError,
    goToLogin,
    goToRegister,
    goToEdit,
    goToPostDetail,
    goToUserDetail,
  };
};

export default Navigate;
