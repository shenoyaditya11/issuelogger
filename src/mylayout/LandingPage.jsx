import React from 'react'
import { useHistory } from 'react-router-dom';
import './navigation-style.css'
import logo from'../newLogo.PNG';

export const LandingPage = (props) => {

    let history = useHistory();

    return(
        <section className="d-grid bg-dark justify-content-center w-100 h-100">

            <section className="row">
                <img src={logo} class="img-fluid" alt="Responsive image"/>
            </section>

            <section className="row align-items-center" style={{marginTop:'15px'}}>
            <div className="col d-flex flex-direction-col justify-content-center border text-white border-primary btn text-center align-items-center"  style={{height:'200px', width:'200px', marginLeft:'10px', marginRight:'10px'}} onClick={()=>{history.push(`/items`)}}>
               
               <b> Items</b>
            </div>

            <div className="col d-flex flex-direction-col justify-content-center border text-white border-primary btn text-center align-items-center" style={{marginLeft:'10px', marginRight:'10px',height:'200px', width:'200px'}} onClick={()=>{history.push(`/clients`)}}>
                <b> Clients </b>
            </div>
            </section>
        </section>
    )

}
