import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material";

interface Props {
  children: string;
}

export default function WorkoutPartLink({ children }: Props) {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ backgroundColor: theme.palette.primary.main, padding: "8px" }}
    >
      <SportsMartialArtsIcon />
      {children}
    </Stack>
  );
}
