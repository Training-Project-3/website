import React from "react"
import { Modal, Box, IconButton, Typography, Paper } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

const UIModal = ({
  open,
  onClose,
  children,
  size = "md",
  header = null,
  footer = null,
  closeButton = true,
  vPosition = "center",
}) => {
  let vposition =
    vPosition === "center"
      ? "50%"
      : vPosition === "top"
      ? "10%"
      : vPosition === "bottom"
      ? "90%"
      : vPosition 

  return (
    <Modal
      open={open}
      onClose={onClose}
      centered={"true"}
      sx={{
        "&.focus": {
          outline: "none",
        },
        margin: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: vposition,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: size,
          maxHeight: "80vh", // Set a maximum height
          overflow: "auto", // Add overflow property
          outline: "none",
        }}
      >
        <Box p={2}>
          {closeButton && (
            <IconButton
              edge='end'
              color='inherit'
              onClick={onClose}
              sx={{ position: "absolute", top: 8, right: 15 }}
            >
              <CloseIcon />
            </IconButton>
          )}
          {header && (
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {header}
            </Typography>
          )}
          <div>{children}</div>
          {footer && <div>{footer}</div>}
        </Box>
      </Paper>
    </Modal>
  )
}

export default UIModal
