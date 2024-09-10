import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import Masonry from "react-masonry-css";
import { Container, Typography, Box, Grid } from "@mui/material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

// Recipe Component
export const Recipe = ({ recipe, isRecipeSaved, userID, saveRecipe }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0 25px rgba(0, 255, 255, 0.8)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={recipe.imageUrl}
        alt={recipe.name}
        sx={{ width: "100%", height: "auto" }} // Keep full width and auto height
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: "#00bfff",
            textShadow: "0 0 5px rgba(0, 191, 255, 0.5)",
            marginBottom: "0.5rem",
          }}
        >
          {recipe.name}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {userID && (
            <Button
              variant="contained"
              color={isRecipeSaved(recipe._id) ? "success" : "info"}
              startIcon={
                isRecipeSaved(recipe._id) ? <CheckIcon /> : <SaveIcon />
              }
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              sx={{
                marginBottom: 2,
                backgroundColor: isRecipeSaved(recipe._id)
                  ? "success.main"
                  : "info.main",
                "&:hover": {
                  backgroundColor: isRecipeSaved(recipe._id)
                    ? "success.dark"
                    : "info.dark",
                },
              }}
            >
              {isRecipeSaved(recipe._id) ? "SAVED" : "SAVE"}
            </Button>
          )}
        </Box>
        <Typography
          variant="h6"
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
            color: "#e0e0e0",
            marginBottom: "0.5rem",
          }}
        >
          {recipe.instructions}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#f7f7f7",
            fontStyle: "italic",
          }}
        >
          Cooking Time: {recipe.cookingTime} minutes
        </Typography>
      </CardContent>
    </Card>
  );
};

// Home Component
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

  // Masonry Breakpoint Columns (for responsiveness)
  const breakpointColumnsObj = {
    default: 4, // 4 columns for large screens
    1100: 3, // 3 columns for medium screens
    700: 2, // 2 columns for small screens
    500: 1, // 1 column for mobile
  };

  return (
    <Container sx={{ marginTop: 10, marginBottom: 6 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        color="secondary"
        sx={{ textShadow: "0 0 8px pink", marginBottom: 6 }}
      >
        Explore Delicious Recipes
      </Typography>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        style={{
          display: "flex",
          marginLeft: "-15px", // Adjust gap
          width: "auto",
        }}
        columnClassName="my-masonry-grid_column"
      >
        {recipes.map((recipe, index) => (
          <Box key={index} sx={{ marginBottom: "30px", paddingLeft: "15px" }}>
            <Recipe
              key={index}
              recipe={recipe}
              isRecipeSaved={isRecipeSaved}
              userID={userID}
              saveRecipe={saveRecipe}
            />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
};
