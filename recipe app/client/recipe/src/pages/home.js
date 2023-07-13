import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from "react-cookie";

export const Home = () => {
  const [recipes,setRecipes] = useState([]);
  const [savedRecipes,setSavedRecipes] = useState([]);
  const userID=useGetUserID();
  const [cookies, ] = useCookies(["access_token"]);

  useEffect(()=>{
    const fetchRecipe = async () =>{
      try {
        const response = await axios.get("https://recipe-app-backend-ezx1.onrender.com/recipes");
        setRecipes(response.data);
        // console.log(response.data);
      } catch(err) {
        console.error(err);
      }

    }
    if(userID){

      const fetchSavedRecipe = async () =>{
        try {
          const response = await axios.post(
            "https://recipe-app-backend-ezx1.onrender.com/recipes/savedRecipes/ids",{userID});
            setSavedRecipes(response.data.savedRecipes);
            console.log(response.data);
          } catch(err) {
            console.error(err);
          }
          
        }
        fetchSavedRecipe();
      }
    fetchRecipe();
  },[]);

  const saveRecipe = async (recipeID)=>{
    try {
      const response = await axios.put("https://recipe-app-backend-ezx1.onrender.com/recipes",{
        recipeID,
        userID,
    },
    { headers: { authorization: cookies.access_token}}
    );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes);
    } catch(err) {
      console.error(err);
    }
  };

  const isRecipeSaved= (id)=> savedRecipes.includes(id);

  

  return (
    <div className='create-recipe container-fluid homme-container '>
      <h2 className='auth-heading createRecipe-heading '>Recipes</h2>
      <div className=' container-fluid home-container ul'>
        {recipes.map((recipe,index)=>(
          <div key={index} className='container recipe-container create-recipe-form inline'>
            <h1 className='recipe-name'>{recipe.name}</h1>
            <div className='save-container'>
            {userID  && <button onClick={()=>saveRecipe(recipe._id)} className='btn btn-success save-btn m-3 inline' disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "SAVED":"SAVE"}</button>}
            {savedRecipes.includes(recipe._id)&&<h4 className='already-saved inline'>Already Saved</h4>}
            </div>
              <img className='image container' src={recipe.imageUrl} alt={recipe.name}/>
            <div className='ingredients-container'>
              <h3 className='heading'>Ingredients:</h3>
              {recipe.ingredients.map((ingredient,indx)=>(
                <li key={indx} className='label ingredients'>{ingredient}</li>
              ))}
            </div>
            <div className='instructions '>
              <h3 className='heading'>Instructions:</h3>
              <p className='label instructions '>{recipe.instructions}</p>
            </div>
            <p className='label cookingtime'>Cooking Time: <p className='label'>{recipe.cookingTime} minutes</p></p>
          </div>
        ))}
      </div>
    </div>
  )
}
