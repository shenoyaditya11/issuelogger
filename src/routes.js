import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
  } from 'react-router-dom';

  import React from 'react'


export const PrivateRoute = ({component: Component, authed, ...rest})=>{



    console.log(rest.path);
    return  (



      <Route {...rest}
      render ={ (props) => authed === true ? <Component {...props} />

              : <Redirect to={{pathname:"/", state:{from : props.location}}}/>


      }/>
    );

  }


export const PublicRoute=({component: Component, authed, ...rest})=>{

    console.log("hi");
    return(

      <Route {...rest}
      render ={ (props) => authed === false ? <Component {...props} />

              : <Redirect to='/dashboard'/>


      }/>
    );

  }
