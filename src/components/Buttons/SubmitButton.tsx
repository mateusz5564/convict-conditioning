import { LoadingButton } from "@mui/lab";

import { SubmitButtonProps } from "../../features/Auth/types";

const SubmitButton = ({ children, loading, sx }: SubmitButtonProps) => {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      fullWidth
      loading={loading}
      loadingIndicator="Loading..."
      sx={sx}
    >
      {children}
    </LoadingButton>
  );
};

export default SubmitButton;
