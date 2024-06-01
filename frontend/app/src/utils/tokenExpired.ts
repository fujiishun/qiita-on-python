// 認証トークンの期限切れを計算する関数
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const exp = decoded.exp * 1000;
    return Date.now() >= exp;
  } catch (error) {
    console.error("Error decoding token: ", error);
    return true;
  }
};
