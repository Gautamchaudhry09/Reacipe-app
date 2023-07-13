import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';

export const SavedRecipe = () => {
  // const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.post(
          "https://recipe-app-backend-ezx1.onrender.com/recipes/savedRecipes",{userID});
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }

    }
    fetchSavedRecipe();
  }, []);


  return (
    <div className='create-recipe container-fluid homme-container '>
      <h2 className='auth-heading createRecipe-heading '>Saved Recipes</h2>
      <ul className=' container home-container'>
        {savedRecipes.map((recipe, index) => (
          <li key={index} className='container recipe-container create-recipe-form'>
            <h2 className=''>{recipe.name}</h2>
            <div className='label instructions inline'>
              <p className='label'>{recipe.instructions}</p>
            </div>
            <img className='image container' src={recipe.imageUrl} alt={recipe.name} />
            <p className='label'>Cooking Time: {recipe.cookingTime}minutes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
