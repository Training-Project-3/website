import { Button } from "@mui/material"
import React from "react"
import { primaryColor } from "../../Constant"

const UIButton = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      variant='contained'
      sx={{
        borderRadius: "9999px",
        fontWeight: "bold",
        background: primaryColor,
        paddingRight: "1.4rem",
        paddingLeft: "1.4rem",
         textTransform: "none",
        ...(window.innerWidth < 450 && { fontSize: "10px" }),
        "&:hover": {
          background: primaryColor,
        },
      }}
    >
      {children}
    </Button>
  )
})

export default UIButton
