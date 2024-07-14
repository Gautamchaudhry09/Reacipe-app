import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import { Login } from "../components/login";
import { Register } from "../components/register";
import { Outlet, Route, Routes } from "react-router-dom";

export const Auth = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212", // Dark background
        p: 3,
      }}
    >
      <Outlet />
    </Box>
  );
};
