import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useGetUserName } from "../hooks/useGetUserName";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const username = useGetUserName();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    localStorage.setItem("userID","");
    localStorage.setItem("userName","");
    navigate("/auth/login");
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1e1e1e",
        boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 130,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, Zindex: 140 }}
        >
          Make Your Recipes
        </Typography>
        {username && (
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            USER: {username}
          </Typography>
        )}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {!cookies.access_token ? (
            <>
              <Button color="inherit" component={Link} to="/auth/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/auth/register">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/create-recipe">
                Create Recipes
              </Button>
              <Button color="inherit" component={Link} to="/saved-recipe">
                Saved Recipes
              </Button>
              <Button color="secondary" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Home" />
            </ListItem>
            {!cookies.access_token ? (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/auth/login"
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/auth/register"
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/create-recipe"
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary="Create Recipes" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/saved-recipe"
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary="Saved Recipes" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    handleDrawerToggle();
                    logout();
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
