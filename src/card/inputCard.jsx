import React from 'react'
import './loginCard-style.css'
import './inputCard-style.css'
import {firestore as db} from '../firebase'


export const InputCard = (props)=>{

    const addtodb = async (event)=> { 

        try{
            event.preventDefault();

            let val = document.getElementById("todo").value;

            document.getElementById("todo").value="";
            
            db.collection("users").doc(props.uid).get()
            .then(result=>{
                if(result.exists){



                    let todo = (result.data()).todo;
                    
                    todo.push(val);

                    db.collection("users").doc(props.uid).update(
                        {
                            todo: todo
                        }
                    )
                }

            })
            
            


        }catch(erro){

        }

    };

    return (
            <div class="inputDiv">

            <div class="floating-label">      
                        <input id="todo" class="floating-input" type="text" placeholder=" "/>
                        <span class="highlight"></span>
                        <label>Add your job</label>
            </div>

            <button onClick = {(event)=> addtodb(event)}> <i style={{fontSize: "24px"}} class="fa">&#xf067;</i></button> 

            </div>

    );
}