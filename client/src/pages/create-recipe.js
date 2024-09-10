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
import RemoveIcon from "@mui/icons-material/Remove";
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

  fontSize: "1.1rem", // Increase font size
  padding: "10px 24px", // Increase padding for a bigger button
  borderRadius: "10px", // More rounded corners
  "&:hover": {
    backgroundColor: "#1c86ee",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Increase shadow on hover
  },
});

const AddIngredientButton = styled(Button)({
  backgroundColor: "#ff1493",
  color: "#fff",
  position: "absolute",
  right: "0px",
  "&:hover": {
    backgroundColor: "#db7093",
  },
});

const RemoveButton = styled(IconButton)({
  color: "#ff6347",
});

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
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

  const removeIngredient = (index) => {
    const ingredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: ingredients });
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
            position: "relative",
            textShadow: "0 0 5px yellow",
          }}
        >
          Ingredients:
          {/* <Box */}
          {/* sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }} */}
          {/* > */}
          <AddIngredientButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addIngredients}
          >
            Add Ingredient
          </AddIngredientButton>
          {/* </Box> */}
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 0,
                marginBottom: 1,
              }}
            >
              <StyledTextField
                fullWidth
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
              />
              <RemoveButton onClick={() => removeIngredient(index)}>
                <RemoveIcon />
              </RemoveButton>
            </ListItem>
          ))}
        </List>

        <StyledButton type="submit" variant="contained">
          Create Recipe
        </StyledButton>
      </Box>
    </Container>
  );
};
