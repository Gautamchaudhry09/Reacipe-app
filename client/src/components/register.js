import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const savedRecipes = ["NA"];

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-app-backend-ezx1.onrender.com/auth/register",
        {
          username,
          password,
          savedRecipes,
        }
      );
      const message = response.data.message;
      alert(message);
    } catch (err) {
      console.error(err);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={5}
        sx={{
          padding: 3,
          borderRadius: 2,
          background: "#1a1a2e",
          boxShadow: "0 0 15px #00bfff",
        }}
      >
        <Typography
          variant="h4"
          color="primary.main"
          align="center"
          gutterBottom
          sx={{
            background: "-webkit-linear-gradient(45deg, #ff007f, #00bfff)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            fontWeight: "bold",
          }}
        >
          Register
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { color: "#00bfff" },
            }}
            sx={{
              input: {
                color: "#fff",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00bfff",
                },
                "&:hover fieldset": {
                  borderColor: "#ff007f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff007f",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#00bfff" },
            }}
            sx={{
              input: {
                color: "#fff",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#00bfff",
                },
                "&:hover fieldset": {
                  borderColor: "#ff007f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff007f",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{
              margin: "auto",

              marginTop: 2,
              backgroundColor: "#00bfff",
              "&:hover": {
                backgroundColor: "#00aaff",
                boxShadow: "0 0 10px #00bfff",
              },
            }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
