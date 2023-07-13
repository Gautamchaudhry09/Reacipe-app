import React, { useState } from 'react'
import axios from "axios";
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async(e)=>{
        e.preventDefault();
        console.log(username,password)
        
        try{
            const response = await axios.post("https://recipe-app-backend-ezx1.onrender.com/auth/login",{
                username,
                password,
            });
            if(response.data.token){
                
                setCookies("access_token",response.data.token);
                localStorage.setItem("userID",response.data.userID);
                localStorage.setItem("userName",username);
                setUsername("");
                setPassword("");
                // window.location.pathname = "/";
                navigate("/");
            }   
            else{
                const message=response.data.message;
                alert(message);
                
            } 
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div className="login-container ">
        <h2 className='auth-heading'>Login</h2>
        <form onSubmit={onSubmit}>
            <div className="form-group p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                <label htmlFor="username" className='label'> Username:</label>
                <input 
                    type="text"
                    className='textbox'
                    id="username-login"
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            
            <div className="form-group p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                <label htmlFor="password" className='label'> Password:</label>
                <input 
                type="password" 
                className='textbox'
                id="password-login" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-auth btn-success' type="submit">Login</button>
        </form>
    </div>
  )
}
