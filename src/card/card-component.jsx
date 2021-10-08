import React, {Component} from 'react'
import './card-style.css'

export const Card = props =>{

    
        return (
            <div className="card">
                
                <div className="title">
                    <h1>{props.cat.name}</h1>
                    <h2>{props.cat.email}</h2>
                </div>
                <img className="image" src={`https://robohash.org/${props.cat.id}?set=set2&size=120x120`}/>
            </div>
        );
    
}