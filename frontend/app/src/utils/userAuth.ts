// 認証情報を取得する関数

interface LoggedInUserData {
  refresh: string;
  access: string;
  user: {
    userId: number;
    loginId: string;
    displayName: string;
  };
  message: string;
}

export const getLoginUserData = (): string | null => {
  const userDataString = localStorage.getItem("userData");
  return userDataString !== null ? userDataString : null;
};

export const getLoginRefreshToken = (): string | null => {
  const userData = getLoginUserData();
  if (userData !== null) {
    const parsedData: LoggedInUserData = JSON.parse(userData);
    return parsedData.refresh;
  } else {
    return null;
  }
};

export const getLoginAccessToken = (): string | null => {
  const userData = getLoginUserData();
  if (userData !== null) {
    const parsedData: LoggedInUserData = JSON.parse(userData);
    return parsedData.access;
  } else {
    return null;
  }
};

export const getLoginUserId = (): number | null => {
  const userData = getLoginUserData();
  if (userData !== null) {
    const parsedData: LoggedInUserData = JSON.parse(userData);
    return parsedData.user.userId;
  } else {
    return null;
  }
};

export const getLoginId = (): string | null => {
  const userData = getLoginUserData();
  if (userData !== null) {
    const parsedData: LoggedInUserData = JSON.parse(userData);
    return parsedData.user.loginId;
  } else {
    return null;
  }
};

export const getLoginDisplayName = (): string | null => {
  const userData = getLoginUserData();
  if (userData !== null) {
    const parsedData: LoggedInUserData = JSON.parse(userData);
    return parsedData.user.displayName;
  } else {
    return null;
  }
};
