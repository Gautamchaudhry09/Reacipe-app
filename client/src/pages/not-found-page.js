import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: 10, marginBottom: 4, textAlign: "center" }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "#ff4081",
          textShadow: "0 0 10px #ff4081",
          marginBottom: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#00bcd4",
          textShadow: "0 0 5px #00bcd4",
          marginBottom: 2,
        }}
      >
        Page Not Found
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};
