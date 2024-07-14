import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from "@mui/material";

import { Recipe } from "../components/Recipe";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://recipe-app-backend-ezx1.onrender.com/recipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userID) {
      const fetchSavedRecipe = async () => {
        try {
          const response = await axios.post(
            "https://recipe-app-backend-ezx1.onrender.com/recipes/savedRecipes/ids",
            { userID }
          );
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.error(err);
        }
      };
      fetchSavedRecipe();
    }
    fetchRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipe-app-backend-ezx1.onrender.com/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <Container sx={{ marginTop: 10, marginBottom: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        color="secondary"
        sx={{ textShadow: "0 0 5px pink", marginBottom: 4 }}
      >
        Recipes
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {recipes.map((recipe, index) => (
          <Recipe
            recipe={recipe}
            isRecipeSaved={isRecipeSaved}
            userID={userID}
            saveRecipe={saveRecipe}
          />
        ))}
      </Grid>
    </Container>
  );
};
