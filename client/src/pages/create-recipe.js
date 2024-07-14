import axios from "axios";
import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

// Styled components
const StyledTextField = styled(TextField)({
  backgroundColor: "#2c2c2c",
  borderRadius: 8,
  margin: "10px 0",
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiFormLabel-root": {
    color: "#ccc",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#1e90ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1e90ff",
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#1e90ff",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1c86ee",
  },
});

const AddIngredientButton = styled(Button)({
  backgroundColor: "#ff1493",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#db7093",
  },
});

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const addIngredients = (event) => {
    event.preventDefault();
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://recipe-app-backend-ezx1.onrender.com/recipes",
        recipe,
        { headers: { authorization: cookies.access_token } }
      );
      alert("Recipe Created");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ marginTop: 10, marginBottom: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        color="secondary"
        sx={{ textShadow: "0 0 5px pink" }}
      >
        Create Recipe
      </Typography>
      <Box
        component="form"
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: 4,
          padding: 3,
          boxShadow: "0 0 10px #1e90ff",
        }}
        onSubmit={onSubmit}
      >
        <StyledTextField
          label="Name"
          name="name"
          fullWidth
          onChange={handleChange}
        />
        <StyledTextField
          label="Image URL"
          name="imageUrl"
          fullWidth
          onChange={handleChange}
        />
        <StyledTextField
          label="Cooking Time (minutes)"
          name="cookingTime"
          type="number"
          fullWidth
          onChange={handleChange}
        />
        <StyledTextField
          label="Instructions"
          name="instructions"
          multiline
          rows={4}
          fullWidth
          onChange={handleChange}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#f0f0f0",
            marginBottom: 1,
            textShadow: "0 0 5px yellow",
          }}
        >
          Ingredients:
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <StyledTextField
                fullWidth
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
              />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <AddIngredientButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addIngredients}
          >
            Add Ingredient
          </AddIngredientButton>
        </Box>
        <StyledButton type="submit" variant="contained">
          Create Recipe
        </StyledButton>
      </Box>
    </Container>
  );
};
