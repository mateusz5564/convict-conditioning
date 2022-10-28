import { Box } from "@mui/material";

type Props = {
  videoId: string;
};

const EmbedYTVideo = ({ videoId }: Props) => {
  return (
    <Box
      sx={{
        paddingTop: "56.25%",
        position: "relative",
        "& iframe": {
          position: "absolute",
          top: 0,
        },
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video - exercise instructions"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default EmbedYTVideo;
