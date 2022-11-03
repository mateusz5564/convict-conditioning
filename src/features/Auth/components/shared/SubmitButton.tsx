import { LoadingButton } from "@mui/lab";

import { SubmitButtonProps } from "../../types";

const SubmitButton = ({ children, loading }: SubmitButtonProps) => {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      fullWidth
      sx={{ mt: 2 }}
      loading={loading}
      loadingIndicator="Loading..."
    >
      {children}
    </LoadingButton>
  );
};

export default SubmitButton;
