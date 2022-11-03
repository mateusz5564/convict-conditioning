import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import EmbedYTVideo from "../../../../../components/EmbedYTVideo/EmbedYTVideo";
import { Exercise } from "../../../../../types";

interface Props {
  exercise: Exercise;
}

const ExerciseInstruction = ({ exercise }: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {exercise.name} - {exercise.step}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ mb: 2 }}>{exercise.description}</Typography>
        {exercise.yt_video_id && (
          <EmbedYTVideo videoId={exercise.yt_video_id} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ExerciseInstruction;
