export const AddIssueDialog = (props)=>{


    return <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">ADD NEW INSTRUMENT</h5>
                <span type="button" class="btn" aria-label="Close" onClick={() => props.onClose()}>
                    <span aria-hidden="true">&times;</span>
                </span>
            </div>
            <div class="modal-body">
                <div className="d-flex flex-column w-100">
                    <input className="w-100"  id="client" placeholder="Client"/>
                    <input className="w-100" id="issue" placeholder="Issue"/>
                    <input className="w-100" id="solution" placeholder="Solution"/>
                    <input className="w-100" type='date' id="date" placeholder="Date"/>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={() => props.onClose()}>Close</button>
                <button type="button" class="btn btn-primary" onClick={()=>{props.onSubmit()}}>Save changes</button>
            </div>
        </div>
    </div>
}