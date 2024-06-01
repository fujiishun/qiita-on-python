import { AxiosError } from "axios";

import axiosInstance from "@/http/axiosInstance";
import { Comment } from "@/types/global";
import { CreateCommentData } from "@/types/comment";

// コメント作成API
export const createComment = async (commentData: CreateCommentData) => {
  try {
    const response = await axiosInstance.post(
      `/api/posts/${commentData.postId}/comments/`,
      {
        body: commentData.body,
        post: commentData.postId,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error posting comment: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// コメント削除API
export const deleteComment = async (commentId: string) => {
  try {
    await axiosInstance.delete(`/api/comments/${commentId}/`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error deleting comment: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// 投稿に紐づくコメント取得API
export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get<Comment[]>(
      `/api/posts/${postId}/comments/`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error fetching comments by post ID: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};
