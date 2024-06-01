import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { User } from "@/types/global";
import UserEditCard from "@/components/user/editCard";
import UserEditForm from "@/components/user/editForm";
import { fetchUserDataById, updateUserData } from "@/api/user";
import { getLoginUserId } from "@/utils/userAuth";
import Navigate from "@/hooks/useNavigate";

const UserEditPage: React.FC = () => {
  const { userId } = useParams();
  const { goToTop, goToUserDetail, goToError } = Navigate();
  const [formData, setFormData] = useState<User | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUserId = getLoginUserId();
        if (
          !loggedInUserId ||
          (userId && loggedInUserId.toString() !== userId)
        ) {
          goToTop(); // 自身の編集ページでない場合、トップページにリダイレクト
          return;
        }

        if (userId) {
          const userData = await fetchUserDataById(userId);
          if (userData) {
            setFormData({
              loginId: userData.loginId,
              displayName: userData.displayName,
            });
          }
        }
      } catch (error) {
        goToError();
      }
    };
    fetchUserData();
  }, [userId]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (displayName: string) => {
    if (!userId || !formData) return;
    setIsSubmitting(true);
    try {
      const updatedUser = await updateUserData(userId, { displayName });
      setFormData(updatedUser);
      goToUserDetail(userId);
      alert("表示名が更新されました。");
    } catch (error) {
      setErrorMessages(["システムエラー：表示名の更新に失敗しました"]);
    }
    setIsSubmitting(false);
  };

  return (
    <Container className="mt-3">
      {formData && (
        <>
          <UserEditCard user={formData} />
          <div className="mt-4">
            <UserEditForm
              formData={formData}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default UserEditPage;
