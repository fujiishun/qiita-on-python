/**
 * ログイン
 */
export type LoginData = {
  loginId: string;
  password: string;
};

/**
 * サインアップ
 */
export type RegisterData = {
  loginId: string;
  displayName: string;
  password: string;
  confirmationPassword: string;
};
