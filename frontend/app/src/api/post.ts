import { AxiosError } from "axios";

import axiosInstance from "@/http/axiosInstance";
import { Post } from "@/types/global";
import { PostData } from "@/types/post";

// 投稿作成API
export const createPost = async (createPostData: PostData): Promise<Post> => {
  try {
    const response = await axiosInstance.post<Post>(
      "/api/posts/",
      createPostData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error creating post: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// 投稿編集API
export const updatePost = async (
  postId: string,
  updatePostData: PostData
): Promise<Post> => {
  try {
    const response = await axiosInstance.patch<Post>(
      `/api/posts/${postId}/`,
      updatePostData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error updating post: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// 投稿削除API
export const deletePostById = async (postId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/posts/${postId}/`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error deleting post: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// 投稿詳細取得API
export const getPostById = async (postId: string): Promise<Post> => {
  try {
    const response = await axiosInstance.get<Post>(`/api/posts/${postId}/`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error fetching post by ID: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// 投稿リスト取得＆検索API
export const searchPosts = async (query = ""): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<Post[]>(
      `/api/posts/?search=${query}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error searching posts: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};

// ユーザーに紐づく投稿取得API
export const fetchUserPostsById = async (userId: string): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<Post[]>(
      `/api/users/${userId}/posts/`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error searching user posts: ",
      axiosError.response || axiosError.message
    );
    throw axiosError;
  }
};
