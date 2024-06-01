/**
 * 投稿データ
 */
export type PostData = {
  title: string;
  body: string;
  isDraft?: boolean; // 処理によっては不要な項目のため?をつける
};
