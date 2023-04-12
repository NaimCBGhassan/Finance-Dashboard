import { useState } from "react";
import { Link } from "react-router-dom";
import WebhookIcon from "@mui/icons-material/Webhook";
import { Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <WebhookIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finanseer
        </Typography>
      </FlexBetween>
      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            // onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box></Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
