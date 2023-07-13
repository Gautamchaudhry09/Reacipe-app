import axios from 'axios';
import React, { useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, ] = useCookies(["access_token"]);

  const [recipe,setRecipe]=useState({
    name: "",
    ingredients:[],
    instructions: "",
    imageUrl:"",
    cookingTime:0,
    userOwner: userID,
  });


  const handleChange=(event)=>{
    const{name,value}=event.target;
    setRecipe({...recipe, [name]:value});

  };

const handleIngredientChange = (event,index)=>{
  const {value} = event.target;
  const ingredients=recipe.ingredients;
  ingredients[index] = value;
  setRecipe({...recipe,ingredients:ingredients});
};

const addIngredients =(event)=>{
    event.preventDefault();
    setRecipe({...recipe, ingredients: [...recipe.ingredients,""]})
  }
// console.log(recipe);
const onSubmit = async (event)=>{
  event.preventDefault();
  try {
    await axios.post("https://recipe-app-backend-ezx1.onrender.com/recipes",recipe,
    
    { headers: { authorization: cookies.access_token}})
    alert("Recipe Created");
  } catch(err) {
    console.error(err);
  }
}
  return (
    <div className='create-recipe container-fluid'>

      <h2 className='auth-heading createRecipe-heading'> Create Recipe</h2>
      <form className='create-recipe-form container' onSubmit={onSubmit}>

        <label htmlFor="name"className='label'>NAME</label>
        <input type="text" className='textbox' name="name" onChange={(event)=>handleChange(event)}/>

        <label htmlFor="ingredients"className='label'>Ingredients</label>
        {recipe.ingredients.map((ingredient,index)=>(
          <input 
          key={index}
          type="text"
          className='textbox'
          name="ingredients"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event,index)}/>
        ))}
        <button className='btn btn-info submit-btn' onClick={addIngredients}>Add Ingredient</button>

        <label className='label' htmlFor="Instructions">Instructions</label>
        <textarea id ="instructions" className='textbox' name="instructions" onChange={(event)=>handleChange(event)}></textarea>  

        <label htmlFor="imageUrl" className='label'>Image URL</label>
        <input type="text" className='textbox' id ="imageUrl"name='imageUrl' onChange={(event)=>handleChange(event)}/>

        <label htmlFor="cookingTime" className='label'>Cooking Time</label>
        <input type="number" className='textbox' id ="cookingTime"name='cookingTime' onChange={(event)=>handleChange(event)}/>
        
        <button className='btn btn-warning submit-btn' type="submit">Create Recipe</button>
      </form>
    </div>
  )
}

