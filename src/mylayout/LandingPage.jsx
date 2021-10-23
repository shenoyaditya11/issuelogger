import React from 'react'
import { useHistory } from 'react-router-dom';
import './navigation-style.css'

export const LandingPage = (props) => {

    let history = useHistory();

    return(
        <section className="d-grid bg-dark justify-content-center w-100 h-100">

            <section className="row align-items-center">
            <div className="col border text-white border-primary btn text-align-center"  style={{height:'200px', width:'200px'}} onClick={()=>{history.push(`/instruments`)}}>
                Instruments
            </div>

            <div className="col border text-white border-primary btn text-align-center" style={{height:'200px', width:'200px'}} onClick={()=>{history.push(`/clients`)}}>
                Clients
            </div>
            </section>
        </section>
    )

}
