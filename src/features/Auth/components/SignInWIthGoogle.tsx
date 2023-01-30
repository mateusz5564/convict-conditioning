import SignInWithGoogleButton from "components/Buttons/SignInWithGoogleButton";

import useLoginWithOAuth from "../hooks/useLoginWithOAuth";

const SignInWithGoogle = () => {
  const { mutate: login } = useLoginWithOAuth();

  const handleGoogleSignInClick = () => {
    login("google");
  };

  return <SignInWithGoogleButton onClick={handleGoogleSignInClick} />;
};

export default SignInWithGoogle;
