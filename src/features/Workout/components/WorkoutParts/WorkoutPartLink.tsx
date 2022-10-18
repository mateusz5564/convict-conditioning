import { Link } from "react-router-dom";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  children: string;
  to: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function WorkoutPartLink({ children, to }: Props) {
  const theme = useTheme();

  return (
    <StyledLink to={to}>
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
    </StyledLink>
  );
}
