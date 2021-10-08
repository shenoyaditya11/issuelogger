export const AddInstrumentDialog = (props) => {




    return <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">ADD NEW INSTRUMENT</h5>
                <span type="button" class="btn" aria-label="Close" onClick={() => props.onClose()}>
                    <span aria-hidden="true">&times;</span>
                </span>
            </div>
            <div class="modal-body">
                <div class="d-flex flex-column">

                <div class="input-group">
                    <input placeholder="INSTURMENT NAME" id="instrumentname"/>
                </div>

                    <div class="d-flex flex-row mt-2">
                        <input type="file" id="inputGroupFile02" placeholder="Instrument Image"/>
                    </div>
                </div>

               


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={() => props.onClose()}>Close</button>
                <button type="button" class="btn btn-primary" onClick={()=>{props.onSubmit()}}>Save changes</button>
            </div>
        </div>
    </div>

    /*return (
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
    )*/
}