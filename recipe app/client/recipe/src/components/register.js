import React, { useState } from 'react'
import axios from "axios";


export const Register = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const savedRecipes=["NA"];
    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("https://recipe-app-backend-ezx1.onrender.com/auth/register",{
                username,
                password,
                savedRecipes,
            });
            console.log(response.data);

            const message=response.data.message;
            alert(message);
        }
        catch(err){
            console.error(err);
        }
        setUsername("");
        setPassword("");
    }

  return (
    <div className="register-container ">
        <form onSubmit={onSubmit}>
            <h2 className='auth-heading '>Register</h2>
            <div className="form-group p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                <label htmlFor="username" className='label'> Username:</label>
                <input 
                    type="text"
                    className='textbox'
                    id="username-register"
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            
            <div className="form-group p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                <label htmlFor="password" className='label'> Password:</label>
                <input 
                type="password" 
                className='textbox'
                id="password-register" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-auth btn-success' type="submit">Register</button>

        </form>
    </div>
  )
}



