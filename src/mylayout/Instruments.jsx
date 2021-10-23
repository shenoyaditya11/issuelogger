import React, {useState, useEffect} from 'react'
import {AddInstrumentDialog} from '../components/AddInstrumentDialog';
import { Link } from 'react-router-dom';
import './navigation-style.css'
import { auth, firestore, storage } from '../firebase';

import { useHistory } from 'react-router-dom';
import {Gallery} from './Gallery';

export const Instruments = (props) => {

    const [addInstrument, openAddInstrument] = useState(false);
    const [items, setItems] = useState([])
    const [forceRerender, setRender] =useState(true);


    useEffect(()=>{
        let unsubscribe = fetchItem();

        return () => unsubscribe()
    },[])

    



    let addInstrumentHandler = ()=>{
        openAddInstrument(true);
        console.log("done")
    }



    let submitData = ()=>{

        let image = document.getElementById('inputGroupFile02').files[0];

        

        console.log("image",image)


        let imageName = image.name//image.substr(image.lastIndexOf('\\')+1, image.length);
        let instrumentName = document.getElementById('instrumentname').value;

        
        // const u = new URL(`file:///${image}`).href;

        // fetch(u)
        // .then(response => {
        //     return response.blob();
        // })
        // .then(blob => {
        //     const storageRef = storage.ref().child(instrumentName+"_"+imageName);
        //     storageRef.put(blob).then(snapshot => {
        //         storage
        //     .ref(instrumentName+"_"+imageName)
        //     .getDownloadURL()
        //     .then( url => {
        //         console.log(url);
        //     let instrumentName = document.getElementById('instrumentname').value;
        //         firestore.collection('Instruments').doc(instrumentName+"__").set({'name':instrumentName,'url':url})
        //         .then(
        //             firestore.collection('Issue').doc(instrumentName+"__").set({'issues':[]}).then(  ()=>openAddInstrument(false)))
                  
        //     });
        //     });
        // });
    

        storage.ref().child(instrumentName+"_"+image.name).put(image, {contentType:'image/jpeg'}).then(()=>{
            storage
            .ref(instrumentName+"_"+imageName)
            .getDownloadURL()
            .then( url => {
                console.log(url);
            let instrumentName = document.getElementById('instrumentname').value;
                firestore.collection('Instruments_').doc(instrumentName).set({'name':instrumentName,'url':url})
                .then(
                    firestore.collection('Issue').doc(instrumentName).set({'issues':[]}).then(  ()=>openAddInstrument(false)))
                  
            });
        })
    }


    useEffect(()=>{
            console.log("items =",items);

            setRender(prev=> !prev);
    }, [items])

    let fetchItem = ()=>{
        console.log("fetching item")
       
       return  firestore.collection('Instruments_')
        .onSnapshot(snap => {
            const data = snap.docs.map(doc => ({'id':doc.id, ...doc.data()}));
            console.log("data = ", data)
            setItems(prevItem => ([...data]));
           
          });
        



    }
    
    return addInstrument === true ? (<AddInstrumentDialog title={"ADD NEW INSTRUMENT"} onClose={()=>{console.log("closing"); openAddInstrument(false)}}
        onSubmit={()=>{submitData()}}
    />) : (

        <section className="h-100">

            <nav class="navbar fixed-top navbar-dark" style={{ height: '10vh', padding: '0',backgroundColor:'#212121' }}>
                <div class="d-flex justify-content-end w-100 mt-2 mb-2">

                <span id="home" className="btn text-white" href="#">
                        <Link to='/'>Home</Link>
                </span>
                
                <span className="btn text-white" onClick={(event)=>{addInstrumentHandler()}}>
                       Add instrument
                    </span>
                    <span id="logout" className="btn text-white" onClick={(event) => auth.signOut()} href="#">
                        <Link to='/'>Logout</Link>
                    </span>

                   

                    


                </div>
               

            </nav>

            <Gallery type='instruments' items={items}/>

           
        </section>
    )
}