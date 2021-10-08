import React from 'react';
import {Link}  from 'react-router-dom';
import * as Routes from '../constants'
import './navigation-style.css'

/*
     <nav class="navbar">
            <ul>
                <li class="active">
                    <Link to={Routes.home} >Home</Link>
                </li>
                <li>
                    <Link to={Routes.signin}>Sign up</Link>
                </li>
            </ul>
        </nav>
*/


export const StaticNav = (prop)=>{




    return (
        <nav className="navbar">
            <a id="login" className="active" >
                <Link to={Routes.home} >Login</Link>
            </a>
            <a id= "signup" > 
                <Link to={Routes.signin} >Sign up</Link>
            </a>
            
        </nav>
    );
};