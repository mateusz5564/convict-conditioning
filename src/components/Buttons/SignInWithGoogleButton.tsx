import { ReactEventHandler } from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  onClick: ReactEventHandler;
};

const SignInWithGoogleButton = ({ onClick }: Props) => {
  const CustomButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "0",
    paddingRight: "16px",
    lineHeight: 1.5,
    color: "white",
    backgroundColor: "#4285F4",
    fontFamily: ["Roboto"],
    "&:hover": {
      backgroundColor: "#0069d9",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#3367D6",
    },
    "&:focus": {
      outline: "2px solid #b4c8e93e",
    },
    img: {
      marginRight: "8px",
    },
  });

  return (
    <CustomButton onClick={onClick}>
      <img src="btn_google_dark_normal_ios.svg" alt="" /> Sign In With Google
    </CustomButton>
  );
};

export default SignInWithGoogleButton;
