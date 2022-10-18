import { LoadingButton } from "@mui/lab";
import { SubmitButtonProps } from "../../types";

export const SubmitButton = ({ children, loading }: SubmitButtonProps) => (
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
