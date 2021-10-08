import React, { Component } from 'react';


import {

  HashRouter as HRouter,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';


import './App.css'; 


import * as Routes from "./constants";

import {LoginCard} from './card/loginCard';
import {SignUpCard} from './card/signUpCard';
import {Dashboard} from "./mylayout/dashboard";
import {Details} from "./mylayout/Details";
import {StaticNav} from './mylayout/navigation';
import { auth } from "./firebase";
import {PrivateRoute, PublicRoute} from './routes'


class App extends Component {
  constructor(){
    super();
  this.state={

    user:{name:"user"},
    authed:false,
    loading: true
    
  };
    
  }
  componentDidMount(){

    auth.onAuthStateChanged((userAuth) => {

      

      if(userAuth){
      this.setState({ user: userAuth, authed:true, loading:false});
      
      }
      else{
        this.setState({ user: null, authed:false, loading:false});
      }

    //  console.log(this.state.user.uid);
      
    });
      
    
      
  }
  shouldComponentUpdate(nextProps, nextState){

    return true;
  }



  
  render() {
    return this.state.loading === true ? <h1>Loading.....</h1> : (
     
      <div className="App">

         
  <Router>
    <div className="App" style={{height:'100%', isplay: 'flex', flexDirection:'column',justifyContent: 'center'}}>
      <Switch>
        
        <PrivateRoute exact path="/dashboard/:id" authed ={this.state.authed} component={()=><Details state={this.state}/>}/>
        <PrivateRoute exact path={Routes.dashboard} authed ={this.state.authed} component={()=><Dashboard state={this.state}/>}/>
        
        <PublicRoute path={Routes.signin} authed ={this.state.authed} component={SignUpCard}/>
        
        <PublicRoute exact path={Routes.home} authed ={this.state.authed} component={LoginCard}/>
        
      </Switch>
    </div>
    </Router>


          

      </div>
        
        );
  }
}

export default App;
