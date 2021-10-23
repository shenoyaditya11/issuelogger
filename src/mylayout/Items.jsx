import React, {useState, useEffect} from 'react'
import {AdditemDialog} from '../components/AddInstrumentDialog';
import { Link } from 'react-router-dom';
import './navigation-style.css'
import { auth, firestore, storage } from '../firebase';

import { useHistory } from 'react-router-dom';
import {Gallery} from './Gallery';

export const Items = (props) => {

    const [additem, openAdditem] = useState(false);
    const [items, setItems] = useState([])
    const [forceRerender, setRender] =useState(true);


    useEffect(()=>{
        let unsubscribe = fetchItem();

        return () => unsubscribe()
    },[])

    



    let additemHandler = ()=>{
        openAdditem(true);
        console.log("done")
    }



    let submitData = ()=>{

        let image = document.getElementById('inputGroupFile02').files[0];

        

        console.log("image",image)


        let imageName = image.name//image.substr(image.lastIndexOf('\\')+1, image.length);
        let itemName = document.getElementById('itemname').value;

        
        // const u = new URL(`file:///${image}`).href;

        // fetch(u)
        // .then(response => {
        //     return response.blob();
        // })
        // .then(blob => {
        //     const storageRef = storage.ref().child(itemName+"_"+imageName);
        //     storageRef.put(blob).then(snapshot => {
        //         storage
        //     .ref(itemName+"_"+imageName)
        //     .getDownloadURL()
        //     .then( url => {
        //         console.log(url);
        //     let itemName = document.getElementById('itemname').value;
        //         firestore.collection('items').doc(itemName+"__").set({'name':itemName,'url':url})
        //         .then(
        //             firestore.collection('Issue').doc(itemName+"__").set({'issues':[]}).then(  ()=>openAdditem(false)))
                  
        //     });
        //     });
        // });
    

        storage.ref().child(itemName+"_"+image.name).put(image, {contentType:'image/jpeg'}).then(()=>{
            storage
            .ref(itemName+"_"+imageName)
            .getDownloadURL()
            .then( url => {
                console.log(url);
            let itemName = document.getElementById('itemname').value;
                firestore.collection('items_').doc(itemName).set({'name':itemName,'url':url})
                .then(
                    firestore.collection('Issue').doc(itemName).set({'issues':[]}).then(  ()=>openAdditem(false)))
                  
            });
        })
    }


    useEffect(()=>{
            console.log("items =",items);

            setRender(prev=> !prev);
    }, [items])

    let fetchItem = ()=>{
        console.log("fetching item")
       
       return  firestore.collection('items_')
        .onSnapshot(snap => {
            const data = snap.docs.map(doc => ({'id':doc.id, ...doc.data()}));
            console.log("data = ", data)
            setItems(prevItem => ([...data]));
           
          });
        



    }
    
    return additem === true ? (<AdditemDialog title={"ADD NEW item"} onClose={()=>{console.log("closing"); openAdditem(false)}}
        onSubmit={()=>{submitData()}}
    />) : (

        <section className="h-100">

            <nav class="navbar fixed-top navbar-dark" style={{ height: '10vh', padding: '0',backgroundColor:'#212121' }}>
                <div class="d-flex justify-content-end w-100 mt-2 mb-2">

                <span id="home" className="btn text-white" href="#">
                        <Link to='/'>Home</Link>
                </span>
                
                <span className="btn text-white" onClick={(event)=>{additemHandler()}}>
                       Add Item
                    </span>
                    <span id="logout" className="btn text-white" onClick={(event) => auth.signOut()} href="#">
                        <Link to='/'>Logout</Link>
                    </span>

                   

                    


                </div>
               

            </nav>

            <Gallery type='items' items={items}/>

           
        </section>
    )
}