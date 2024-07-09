import React from 'react'

const EditProfileModal = () => {
  return (
    <>
    {/* <!-- Edit Profile Start --> */}
    <div className="modal fade theme-modal" id="editProfile" tabIndex="-1" aria-labelledby="exampleModalLabel2"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel2">Edit Profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row g-4">
                        <div className="col-xxl-12">
                            <form>
                                <div className="form-floating theme-form-floating">
                                    <input type="text" className="form-control" id="pname" />
                                    <label htmlFor="pname">Full Name</label>
                                </div>
                            </form>
                        </div>

                        <div className="col-xxl-12">
                            <form>
                                <div className="form-floating theme-form-floating">
                                    <input type="email" className="form-control" id="email1" />
                                    <label htmlFor="email1">Email address</label>
                                </div>
                            </form>
                        </div>

                        <div className="col-xxl-12">
                            <form>
                                <div className="form-floating theme-form-floating">
                                    <input className="form-control" type="tel" name="mobile" id="mobile" maxLength="10" />
                                    <label htmlFor="mobile">Phone Number</label>
                                </div>
                            </form>
                        </div>

                        <div className="col-xxl-12">
                            <form>
                                <div className="form-floating theme-form-floating">
                                    <input className="form-control" type="tel"  name="mobile" id="mobile" maxLength="10"/>
                                    <label htmlFor="mobile">Password</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-animation btn-md fw-bold"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" data-bs-dismiss="modal"
                        className="btn theme-bg-color btn-md fw-bold text-light">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Edit Profile End --> */}
    </>
  )
}

export default EditProfileModal