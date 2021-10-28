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
                <span className="d-flex flex-row justify-content-start">
                        <p>Date:-  </p>
                    <input className="w-100" type='date' id="date" placeholder="Date"/></span>
                    <input className="w-100" id="product_type" placeholder="Product Type"/>
                    <input className="w-100" id="project_nos" placeholder="Project Number"/>
                    <input className="w-100" id="client" placeholder="Client"/>
                    <input className="w-100" id="person" placeholder="Engineer/Manager"/>
                    <textarea className="w-100" id="issue" placeholder="Description"/>
                    <textarea className="w-100" id="solution" placeholder="Solution"/>
                    <textarea className="w-100" id="preventive_action" placeholder="Preventive Action"/>
                    <input className="w-100" id="ref_doc" placeholder="Reference Document Number"/>
                    <input className="w-100" id="item" placeholder="Instrument"/>
                    <input className="w-100" id="dept" placeholder="Concerned Department"/>
                    <input className="w-100" id="impact" placeholder="Impact On"/>
                    <input className="w-100" id="impact_category" placeholder="Impact Category"/>
                    <input className="w-100" id="year" placeholder="Year"/>
                    <input className="w-100" id="response_category" placeholder="Response Category"/>
                    <span className="d-flex flex-row justify-content-start">
                        <p>Corrective Action Date:-  </p>
                    <input className="w-80" type="date" id="corrective_action_date" placeholder="Corrective Action Date"/></span>
                    <textarea className="w-100" id="remarks" placeholder="Remarks"/>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={() => props.onClose()}>Close</button>
                <button type="button" class="btn btn-primary" onClick={()=>{props.onSubmit()}}>Save changes</button>
            </div>
        </div>
    </div>
}