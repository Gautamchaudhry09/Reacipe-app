import React from 'react'
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useGetUserName } from '../hooks/useGetUserName';

export const Navbar = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const username = useGetUserName();
    const logout =()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("userName");
        navigate("/auth");
    }


  return (
    <div className="navbar navbar-expand-lg container-fluid p-3 nav-container">
      <h1 id='name' href="#">Make Your Recipes </h1>
      {username&&<h2 className='label username'>USER: {username}</h2>}
       <button className="navbar-toggler scroll-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse nav-containr" id="navbarNavAltMarkup">
      <div className="navbar-nav ">

        <Link className='links list-inline-item btn btn-sm ' to="/">Home</Link>
        {!cookies.access_token ? (
          <Link className='links list-inline-item btn btn-sm ' to="/auth">Login/Register</Link>
          ) : (
            <>
              <Link className='links list-inline-item btn btn-sm ' to="/create-recipe">Create Recipes</Link>
              <Link className='links list-inline-item btn btn-sm ' to="/saved-recipe">Saved Recipes</Link>
                <button type='button' className="logout-button btn btn-danger" onClick={logout}> Logout</button>
            </>
                )
            }
            </div>
            </div>
    </div>

  )
}
