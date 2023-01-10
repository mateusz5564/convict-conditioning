// eslint-disable-next-line import/prefer-default-export
export const getTabIndex = (pathname: string) => {
  switch (pathname) {
    case "/account/change-password":
      return 0;
    case "/account/change-email":
      return 1;
    case "/account/delete-account":
      return 2;
    default:
      return 0;
  }
};
