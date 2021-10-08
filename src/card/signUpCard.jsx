import React from 'react';
import './signUpCard-style.css';
import '../mylayout/navigation-style.css'
import {auth, firestore as db} from '../firebase'
import {Redirect, useHistory} from 'react-router-dom'




var emailHint = "email";
var passwordHint= "password";
var login = "login";
var thisName="shit"


export const SignUpCard = (props)=>{

  let history = useHistory();
    const createUserWithEmailAndPasswordHandler = async (event) => {
        
        try{
            event.preventDefault();

            emailHint=(document.getElementById("email")).value;
            passwordHint=(document.getElementById("pwd")).value;
            thisName = (document.getElementById("dn")).value ;
            
        
          const {user} = await auth.createUserWithEmailAndPassword(emailHint, passwordHint);
            
          user.updateProfile({
            displayName: thisName
          })
          .then(
              db.collection("users").doc(user.uid).set({
                name: thisName,
                id: user.uid,
                todo:[]
              })
            .then(
              alert("created user")
            )
          )
          .catch(function(error) {
            alert(error);
          })
          ;
   
            
        }
        catch(error){
          alert(error);
        }
    
        
      };

            try{
                document.getElementById("signup").className = "active";
                document.getElementById("login").className = "inactive";
            }catch(err){

            }

            return (
               
               
                    <div class="card">

                        <lable class="title">Sign up</lable>
                        <div class="floating-label">      
                            <input id="email" class="floating-input" type="email" placeholder=" "/>
                            <span class="highlight"></span>
                            <label>Email</label>
                        </div>
                        <div class="floating-label">      
                            <input id="pwd" class="floating-input" type="password" placeholder=" "/>
                            <span class="highlight"></span>
                            <label>Password</label>
                        </div>
                        <div class="floating-label">      
                            <input id="dn" class="floating-input" type="text" placeholder=" "/>
                            <span class="highlight"></span>
                            <label>How we should call you</label>
                        </div>
                        <button class='login' onClick={(event)=>createUserWithEmailAndPasswordHandler(event)}>Sign up</button>
                        <button class='login' onClick = {(event) => {history.replace("/"); console.log("click") }}>
                            Login
                        </button>

                       

                     

                  

                    </div>

                  
                              

            );
        
}