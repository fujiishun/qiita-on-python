/**
 * 記事
 */
export type Post = {
  id: number;
  title: string;
  body: string;
  authorId: number;
  authorName: string;
  isDeleted: boolean;
  isDraft: boolean;
  postedAt: string;
  reWrittenAt?: string;
};

/**
 * コメント
 */
export type Comment = {
  id: number;
  commenterId: number;
  commenterName: string;
  body: string;
  commentedAt: string;
  isDeleted: boolean;
};

/**
 * ユーザー
 */
export type User = {
  loginId: string;
  displayName: string;
};

/**
 * エラー
 */
export type Error = {
  message: string;
};
