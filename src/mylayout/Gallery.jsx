import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

export const Gallery=(props)=>{

    const [itemsView, setItemView] = useState([]);
    const [forceRerender, setRender] =useState(true);
    

    let history = useHistory();

    useEffect(()=>{
        console.log("Got it")
    });

    useEffect(()=>{

        console.log("here")
        console.log("from gallery: ",props.items)
        
        let temp=[];
        props.items.forEach(item=>{

            console.log(item.url);
            fetch(item.url).then(result=>result.blob())
            .then(
                image=> {

                    let url = URL.createObjectURL(image);
                    console.log(url)

            temp.push(
                <section className="rounded border border-primary d-flex flex-column justify-content-center text-center mx-3" style={{width:'200px', height:'210px'}}>
                    <img src={url} style={{width:'200px', height:'200px'}} onClick={()=>history.push(`/${props.type}/${item.id}`)}/>
                    <p className="text-white">{item.name}</p>
                </section>
            );

            if(props.items.length === temp.length){
                setItemView([...temp])
               
            }


            })
        });

       
    },[props.items]);

    useEffect(()=>{
        console.log("item view = ", itemsView)
        setRender(prev => !prev);
    },[itemsView])

    useEffect(()=>{
        console.log(" render = ", forceRerender)
    },[forceRerender])
  


    return (
        <div className="d-flex flex-row flex-wrap bg-dark justify-content-center w-100 h-100" style={{marginTop:'10vh'}}>
            {
                itemsView
            }
               
        </div>
    )
}