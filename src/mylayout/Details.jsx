import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { AddIssueDialog } from '../components/AddIssueDialog';
import { Link } from 'react-router-dom';
import './navigation-style.css'
import { auth, firestore, storage, firebase1 } from '../firebase';

const List = (props) => {

    let client = props.item.client;
    
    let issue = props.item.issue;
    issue = issue[0].toUpperCase() + issue.substring(1);
    let solution = props.item.solution;
   
    let item = props.item.item;

    try{
    item = item[0].toUpperCase() + item.substring(1);
    solution = solution[0].toUpperCase() + solution.substring(1);
    client = client.toUpperCase();
    }catch(exception){

    }


  
    


    return (

        <section className="row text-white rounded border border-primary" style={{ marginTop: '2vh', marginLeft: '10vw', marginRight: '10vw' }}>

            <span className="col-9">
                <section class="d-flex flex-column" >
                    <p className="left text-break"><b>Product Type:- </b> {props.item.product_type}</p>
                    <p className="left text-break"><b>Client:-</b> {client}</p>
                    <p className="left text-break"><b>Impact Category:-</b> {props.item.impact_category}</p>
                    <p className="left text-break"><b>Impact:-</b> {props.item.impact}</p>
                    <p className="left text-break"><b>Issue:-</b> {issue}</p>
                    <p className="left text-break"><b>Solution:-</b> {solution}</p>
                    <p className="left text-break"><b>Preventive Action:-</b> {props.item.preventive_action}</p>
                    <p className="left text-break"><b>Remarks:-</b> {props.item.remarks}</p>
                    <p className="left text-break"><b>Year:- </b> {props.item.year}</p>
                </section>
            </span>
            <span className="col-3">
                <p className="left text-break"><b>Project No.:- </b> {props.item.project_nos}</p>
                <p className="left text-break"><b>Reference Doc No.:- </b> {props.item.ref_doc}</p>
                <p className="left text-break"><b>Department:- </b> {props.item.dept}</p>
                <p className="left text-break"><b>Response Category:- </b> {props.item.response_category}</p>
                <p className="left text-break"><b>created by:- </b> {props.item.person}</p>
                <p className="left text-break"><b>item:-</b> {item}</p>
                <p className="left text-break"><b>created on:- </b> {props.item.date}</p>
                <p className="left text-break"><b>Corrective Action Date:- </b> {props.item.corrective_action_date}</p>
            </span>
        </section>

    )
}

export const Details = () => {


    const [itemId, setitemId] = useState(useParams().id);
    const [issuesView, setIssuesView] = useState([]);
    const [issues, setIssues] = useState([]);
    const [addIssue, openAddIssue] = useState(false);
    const [filter, setFilter] = useState(undefined);
    const [nextPage, setNextPage] = useState(undefined);

    let history = useHistory();

    let addIssueHandler = () => {
        openAddIssue(true);
    }

    let submitData = () => {
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

        let dbRef = firestore.collection('Issue').doc(itemId); //.set({'issues':newIssue}).then(()=>openAddIssue(false));

        dbRef.update({
            issues: firebase1.firestore.FieldValue.arrayUnion({
                'client': client,
                'issue': issue,
                'solution': solution,
                'user': auth.currentUser.displayName,
                'date': date
            })
        }).then(() => openAddIssue(false));
    }



    let submitData2 = () => {
        let client = document.getElementById('client').value;
        let issue = document.getElementById('issue').value;
        let solution = document.getElementById('solution').value;
        let date = document.getElementById('date').value;

        let data = {
            'client': client.toLowerCase(),
            'issue': issue.toLowerCase(),
            'solution': solution.toLowerCase(),
            'user': auth.currentUser.displayName.toLowerCase(),
            'date': date
        }

        firestore.collection(itemId).add(data).then(() => openAddIssue(false));
    }





    let submitData_new = () => {


       
       

        
        let client = document.getElementById('client').value;
        let issue = document.getElementById('issue').value;
        let solution = document.getElementById('solution').value;
        let date = document.getElementById('date').value;
        let item = document.getElementById('item').value;
        let product_type = document.getElementById('product_type').value;
        let project_nos = document.getElementById('project_nos').value;
        let person = document.getElementById('person').value;
        let ref_doc = document.getElementById('ref_doc').value;
        let dept = document.getElementById('dept').value;
        let impact = document.getElementById('impact').value;
        let year = document.getElementById('year').value;
        let preventive_action =  document.getElementById('preventive_action').value;
        let impact_category =  document.getElementById('impact_category').value;
        let response_category =  document.getElementById('response_category').value;
        let corrective_action_date =  document.getElementById('corrective_action_date').value;
        let remarks =  document.getElementById('remarks').value;


        let data = {
            'client': client.toLowerCase(),
            'issue': issue.toLowerCase(),
            'solution': solution.toLowerCase(),
            'date': date,
            'item':item.toLowerCase(),
            'product_type':product_type,
            'project_nos': project_nos,
            'person':person,
            'ref_doc':ref_doc,
            'dept': dept,
            'impact':impact,
            'year':year,
            'preventive_action':preventive_action,
            'impact_category':impact_category,
            'response_category': response_category,
            'corrective_action_date':corrective_action_date,
            'remarks':remarks


        }

        firestore.collection("_ISSUES_").add(data).then(() => openAddIssue(false));
    }


    let logIssueWithXls = () => {

    }


    let fetch = (newFilter) => {

        let path = history.location.pathname; 
        let filter = undefined;
        if(history.location.pathname.includes('items'))
            filter = "item:"+path.substring(path.lastIndexOf('/')+1, path.length).toLowerCase();
        else
            filter = "client:"+path.substring(path.lastIndexOf('/')+1, path.length).toLowerCase();




        
        setIssues([]);
        setIssuesView([])


        let key = undefined, value = undefined, query = undefined, dbRef = undefined;
        let key1 = undefined, value1 = undefined;
        if (filter !== undefined) {

            key = filter.substr(0, filter.indexOf(':'));
            value = filter.substr(filter.indexOf(':') + 1);
            console.log({ key }, { value })
          

        }

        if (newFilter !== undefined && newFilter.trim().length > 0) {

            newFilter = newFilter.toLowerCase();
            key1 = newFilter.substr(0, newFilter.indexOf(':'));
            value1 = newFilter.substr(newFilter.indexOf(':') + 1);
            console.log({ key1 }, { value1 })
            query = key1 + ">=" + value1;
            console.log(query);

        }



        //new additions :- let dbRef = firestore.collection('Issue').doc(itemId);
        let symbol = "==";
        
        if(value.indexOf("general")!=-1){
            console.log("this is general!!");
            symbol = ">=";
            console.log("this is symbol !!", symbol);
        }
        if (query === undefined)
            dbRef = firestore.collection("_ISSUES_").where(key,symbol,value);//.doc(itemId);
        else
            if(key1 === 'year')
                dbRef = firestore.collection("_ISSUES_").where(key,symbol,value).where(key1,'==',value1);
            else{
                dbRef = firestore.collection("_ISSUES_").where(key1,'==',value1).where(key,symbol,value);

                }
                
                //.doc(itemId);
        //






        // new additions
        console.log("DBREF= ", dbRef)
        if (dbRef === undefined) {
            console.log('No collection yet!');
            return
        }


        dbRef.get()
            .then((data) => {
                let temp = [];
                data.forEach(item => {

                    item = item.data();
                    if(value==='general'){
                        if(item.client.indexOf('general')!=-1)
                            temp.push(<List item={item} />)
                    }else{
                        temp.push(<List item={item} />)
                    }

                });
                setIssues(data);
                setIssuesView([...temp])
                console.log(data)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


        //

        // dbRef.onSnapshot(snap => {

        //     console.log("snap", snap)
        //     console.log(snap.docs);
        //     let data = snap.docs;
        //     let temp = [];
        //     data.forEach(item => {

        //         item = item.data();
        //         if (key !== undefined && key !== '') {

        //             key = key.toLowerCase();
        //             value = value.toLowerCase();

        //             let realValue = (item[key]).toLowerCase();


        //             console.log({ key }, { realValue }, { value });

        //             if (realValue.includes(value)) {
        //                 console.log({ item })
        //                 temp.push(<List item={item} />)
        //             }
        //         }
        //         else {
        //             console.log({ key });
        //             temp.push(<List item={item} />)
        //         }
        //     });
        //     setIssues(data);
        //     setIssuesView([...temp])
        //     console.log(data)
        // });
    }

    let fetchWithFilter = () => {
        let filter = document.getElementById('filter').value;
        setFilter(filter);

    }



    useEffect(() => {

        console.log('current user = ', auth.currentUser.displayName)
        let unsubscribe = fetch(filter);

        // return unsubscribe();



    }, [filter])


    return addIssue === true ? (<AddIssueDialog onClose={() => { console.log("closing"); openAddIssue(false) }}
        onSubmit={() => { submitData_new() }}
    />) : (
        <section className="h-100 bg-dark">

            <nav class="navbar fixed-top navbar-dark" style={{ height: '10vh', padding: '0', backgroundColor: '#212121' }}>
                <div class="d-flex justify-content-end w-100 mt-2 mb-2">

              

                    <span className="d-flex">
                        <input className="rounded broder broder-secondary" placeholder="filter" id='filter' />
                        <span className="btn text-white" onClick={(event) => { fetchWithFilter() }}>
                            Search
                        </span>
                    </span>

                    <span id="home" className="btn text-white" href="#">
                        <Link to='/'>Home</Link>
                    </span>
                    <span className="btn text-white" onClick={(event) => { addIssueHandler() }}>
                        Create New Issue
                    </span>
                    <span id="logout" className="btn text-white" onClick={(event) => auth.signOut()} href="#">
                        <Link to='/'>Logout</Link>
                    </span>





                </div>


            </nav>

            <section style={{ marginTop: '10vh' }}>
            
                {
                    issuesView
                }
            </section>


        </section>
    )

}

