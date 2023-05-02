import FlexBetween from "./FlexBetween";
import { useTheme, Box, Typography } from "@mui/material";

type Props = {
  sideText: string;
  title: string;
  height: string;
  icon?: React.ReactNode;
  subtitle?: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText, height }: Props) => {
  const { palette } = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} padding="1.5rem 1rem 0 1rem" height={height}>
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" pb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
