import React from 'react'

const RemoveBoxModal = ({handleDeleteAddress}) => {
  return (
    <>
    {/* <!-- Remove Profile Modal Start --> */}
    <div className="modal fade theme-modal remove-profile" id="removeProfile" tabIndex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
                <div className="modal-header d-block text-center">
                    <h5 className="modal-title w-100" id="exampleModalLabel22">Are You Sure ?</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="remove-box">
                        <p>The permission for the use/group, preview is inherited from the object, object will create a
                            new permission for this object</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-animation btn-md fw-bold" data-bs-dismiss="modal">No</button>
                    <button type="button" className="btn theme-bg-color btn-md fw-bold text-light"
                        data-bs-target="#removeAddress" data-bs-toggle="modal" onClick={() => handleDeleteAddress()} >Yes</button>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade theme-modal remove-profile" id="removeAddress" tabIndex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel12">Done!</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="remove-box text-center">
                        <h4 className="text-content">It's Removed.</h4>
                    </div>
                </div>
                <div className="modal-footer pt-0">
                    <button type="button" className="btn theme-bg-color btn-md fw-bold text-light"
                        data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Remove Profile Modal End --> */}
    </>
  )
}

export default RemoveBoxModal