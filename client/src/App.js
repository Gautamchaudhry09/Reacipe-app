import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipe } from "./pages/saved-recipe";
import Navbar from "./components/navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { NotFoundPage } from "./pages/not-found-page";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#e91e63", // pink
    },
    secondary: {
      main: "#03a9f4", // blue
    },
    warning: {
      main: "#ffeb3b", // yellow
    },
    text: {
      primary: "#ffffff", // white
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      color: "#e91e63", // pink
    },
    h2: {
      color: "#03a9f4", // blue
    },
    h3: {
      color: "#ffeb3b", // yellow
    },
    body1: {
      color: "#ffffff", // white
    },
    body2: {
      color: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "10px",
          "&:hover": {
            backgroundColor: "#03a9f4",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          boxShadow: "none",
          borderBottom: "1px solid #03a9f4",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/saved-recipe" element={<SavedRecipe />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
