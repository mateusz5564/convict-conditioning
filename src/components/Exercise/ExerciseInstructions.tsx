import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Exercise } from "../../types";

interface Props {
  exercise: Exercise;
}

export default function ExerciseInstructions({ exercise }: Props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{exercise.name} - {exercise.step}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{exercise.description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
