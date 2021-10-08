import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AddIssueDialog} from '../components/AddIssueDialog';
import { Link } from 'react-router-dom';
import './navigation-style.css'
import { auth, firestore, storage, firebase1 } from '../firebase';

const List = (props)=>{

    return(
       
        <section className="row text-white rounded border border-primary" style={{marginTop:'2vh', marginLeft:'10vw', marginRight:'10vw'}}>
        

        <span className="col-9">
            <section class="d-flex flex-column w-100  " >
                <h6 className="left"><b>Client:-</b> {props.item.client}</h6>
                <h6 className="left"><b>Issue:-</b> {props.item.issue}</h6>
                <h6 className="left"><b>Solution:-</b> {props.item.solution}</h6>
            </section>
        </span>
        <span className="col-3">
            <p className="left"><b>created by:- </b> {props.item.user}</p>
            <p className="left"><b>created on:- </b> {props.item.date}</p>
        </span>    
        </section>
    
    )
}

export const Details =()=>{


    const [instrumentId, setInstrumentId] = useState(useParams().id);
    const [issuesView, setIssuesView] = useState([]);
    const [issues, setIssues] = useState([]);
    const [addIssue, openAddIssue] = useState(false);
    const [filter, setFilter] = useState(undefined);

    let addIssueHandler = ()=>{
         openAddIssue(true);
    }

     let submitData = ()=>{
        let client = document.getElementById('client').value;
        let issue = document.getElementById('issue').value;
        let solution = document.getElementById('solution').value;
        let date = document.getElementById('date').value;

        // let newIssue = [...issues];

        // newIssue.push({
        //     'client':client,
        //     'issue':issue,
        //     'solution':solution
        // });

        let dbRef = firestore.collection('Issue').doc(instrumentId); //.set({'issues':newIssue}).then(()=>openAddIssue(false));

        dbRef.update({
            issues: firebase1.firestore.FieldValue.arrayUnion({
                'client':client,
                'issue':issue,
                'solution':solution,
                'user':auth.currentUser.displayName,
                'date': date
            })
        }).then(()=>openAddIssue(false));
     }

    
    let logIssueWithXls = ()=>{

    }

    
    let fetch = (filter)=>{

        setIssues([]);
        setIssuesView([])


        console.log("here_____",filter)
        let dbRef =  firestore.collection('Issue').doc(instrumentId);
        let key=undefined, value=undefined;
        if(filter !== undefined){
            
             key = filter.substr(0, filter.indexOf(':'));
             value = filter.substr(filter.indexOf(':')+1);
            console.log({key}, {value})
        }

        
     dbRef.onSnapshot(snap => {
            console.log(snap.data());
            let data = snap.data().issues;
            let temp = [];
            data.forEach(item=>{

                if(key !== undefined && key!== ''){
                    console.log({key}, {item}, item[key]);
                    if(item[key] === value) {
                        console.log({item})
                        temp.push(<List item={item}/>)
                    }
                }
                else{
                    console.log({key});
                    temp.push(<List item={item}/>)
                }
            });
           setIssues(data);
           setIssuesView([...temp])
           console.log(data)
          });
    }

    let fetchWithFilter = ()=>{
        let filter = document.getElementById('filter').value;
        setFilter(filter);
        
    }

  

    useEffect(()=>{

        console.log('current user = ', auth.currentUser.displayName)
        let unsubscribe = fetch(filter);

       // return unsubscribe();

      

    }, [filter])


    return addIssue === true ? (<AddIssueDialog onClose={()=>{console.log("closing"); openAddIssue(false)}}
        onSubmit={()=>{submitData()}}
    />): (
         <section className="h-100 bg-dark">

            <nav class="navbar fixed-top navbar-dark" style={{ height: '10vh', padding: '0',backgroundColor:'#212121' }}>
                <div class="d-flex justify-content-end w-100 mt-2 mb-2">
                    
                    <span className="d-flex">
                        <input className="rounded broder broder-secondary" placeholder="filter" id='filter'/>
                        <span className="btn text-white" onClick={(event)=>{fetchWithFilter()}}>
                            Search
                        </span>
                    </span>

                   
                        <span className="btn text-white" onClick={(event)=>{addIssueHandler()}}>
                        Create New Issue
                        </span>
                        <span className="btn text-white" onClick={(event)=>{logIssueWithXls()}}>
                        Log issue from Execel
                        </span>
                        <span id="logout" className="btn text-white" onClick={(event) => auth.signOut()} href="#">
                            <Link to='/'>Logout</Link>
                        </span>
                   

                   


                </div>
               

            </nav>

            <section style={{marginTop:'10vh'}}>
            {
                issuesView
            }
            </section>

           
        </section>
    )

}

