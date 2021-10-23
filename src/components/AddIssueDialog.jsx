export const AddIssueDialog = (props)=>{


    return <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">ADD NEW ISSUE</h5>
                <span type="button" class="btn" aria-label="Close" onClick={() => props.onClose()}>
                    <span aria-hidden="true">&times;</span>
                </span>
            </div>
            <div class="modal-body">
                <div className="d-flex flex-column w-100">
                    <input className="w-100" type='date' id="date" placeholder="Date"/>
                    <input className="w-100" id="product_type" placeholder="Product Type"/>
                    <input className="w-100" id="project_nos" placeholder="Project Number"/>
                    <input className="w-100" id="client" placeholder="Client"/>
                    <input className="w-100" id="person" placeholder="Engineer/Manager"/>
                    <input className="w-100" id="issue" placeholder="Description"/>
                    <input className="w-100" id="solution" placeholder="Solution"/>
                    <input className="w-100" id="ref_doc" placeholder="Reference Document Number"/>
                    <input className="w-100" id="instrument" placeholder="Instrument"/>
                    <input className="w-100" id="dept" placeholder="Concerned Department"/>
                    <input className="w-100" id="impact" placeholder="Impact On"/>
                    <input className="w-100" id="year" placeholder="Year"/>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={() => props.onClose()}>Close</button>
                <button type="button" class="btn btn-primary" onClick={()=>{props.onSubmit()}}>Save changes</button>
            </div>
        </div>
    </div>
}