import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.post(
          "https://recipe-app-backend-ezx1.onrender.com/recipes/savedRecipes",
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, [userID]);

  return (
    <Container
      sx={{
        marginTop: 8,
        padding: "2rem",
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          color: "#ff007f", // Neon pink color
          textShadow: "0 0 8px rgba(255, 0, 127, 0.6)",
          marginBottom: "2rem",
        }}
      >
        Saved Recipes
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {savedRecipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)", // Neon cyan shadow
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 25px rgba(0, 255, 255, 0.8)", // Brighter neon cyan on hover
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={recipe.imageUrl}
                alt={recipe.name}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    color: "#00bfff", // Neon blue color
                    textShadow: "0 0 5px rgba(0, 191, 255, 0.5)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {recipe.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginTop: 2, textShadow: "0 0 4px pink" }}
                >
                  Ingredients:
                </Typography>
                <List dense>
                  {recipe.ingredients.map((ingredient, indx) => (
                    <ListItem key={indx}>
                      <ListItemText primary={ingredient} />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#e0e0e0", // Light gray color
                    marginBottom: "0.5rem",
                  }}
                >
                  {recipe.instructions}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#f7f7f7", // Light color
                    fontStyle: "italic",
                  }}
                >
                  Cooking Time: {recipe.cookingTime} minutes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
