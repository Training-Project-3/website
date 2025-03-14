import React from "react";
import { CircularProgress, circularProgressClasses } from "@mui/material";
import { primaryColor } from "../../Constant";

const UILoader = () => {
  return (
    <CircularProgress
      disableShrink
      sx={{
        color: primaryColor,
        animationDuration: "550ms",
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      size={40}
      thickness={4}
    />
  );
};

export default UILoader;
