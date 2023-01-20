import { PropsWithChildren } from "react";

import { LoadingButton } from "@mui/lab";
import { SxProps } from "@mui/material";

type SubmitButtonProps = {
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  sx?: SxProps;
};

const SubmitButton = ({
  children,
  loading,
  sx,
}: PropsWithChildren<SubmitButtonProps>) => {
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
