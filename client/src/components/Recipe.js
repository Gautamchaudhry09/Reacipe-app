import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

export const Recipe = ({
  recipe,
  isRecipeSaved,
  userID,
  index,
  saveRecipe,
}) => {
  return (
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
          // height="140"
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
            {isRecipeSaved(recipe._id) && (
              <Typography variant="body2" color="success.main">
                Already Saved
              </Typography>
            )}
          </Box>
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
  );
};
