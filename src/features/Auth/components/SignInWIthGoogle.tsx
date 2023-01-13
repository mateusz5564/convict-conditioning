import SignInWithGoogleButton from "components/Buttons/SignInWithGoogleButton";

import useLogin from "../hooks/useLogin";

const SignInWithGoogle = () => {
  const { mutate: login } = useLogin();

  const handleGoogleSignInClick = () => {
    login({ provider: "google" });
  };

  return <SignInWithGoogleButton onClick={handleGoogleSignInClick} />;
};

export default SignInWithGoogle;
