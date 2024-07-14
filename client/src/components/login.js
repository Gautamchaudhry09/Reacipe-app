import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-app-backend-ezx1.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      if (response.data.token) {
        setCookies("access_token", response.data.token);
        localStorage.setItem("userID", response.data.userID);
        localStorage.setItem("userName", username);
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        const message = response.data.message;
        alert(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={5}
        sx={{
          padding: 3,
          borderRadius: 2,
          background: "#1a1a2e",
          boxShadow: "0 0 15px #ff007f",
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
          Login
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
              style: { color: "#ff007f" },
            }}
            sx={{
              input: {
                color: "#fff",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ff007f",
                },
                "&:hover fieldset": {
                  borderColor: "#00bfff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bfff",
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
              style: { color: "#ff007f" },
            }}
            sx={{
              input: {
                color: "#fff",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ff007f",
                },
                "&:hover fieldset": {
                  borderColor: "#00bfff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bfff",
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
              backgroundColor: "#ff007f",
              "&:hover": {
                backgroundColor: "#ff5e7f",
                boxShadow: "0 0 10px #ff007f",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
