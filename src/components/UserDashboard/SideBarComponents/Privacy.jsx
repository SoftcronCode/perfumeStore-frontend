import React from 'react'

const Privacy = () => {
  return (
    <>
    <div className="dashboard-privacy">
        <div className="dashboard-bg-box">
            <div className="dashboard-title mb-4">
                <h3>Privacy</h3>
            </div>

            <div className="privacy-box">
                <div className="d-flex align-items-start">
                    <h6>Allows others to see my profile</h6>
                    <div className="form-check form-switch switch-radio ms-auto">
                        <input className="form-check-input" type="checkbox" role="switch"
                            id="redio1"/>
                        <label className="form-check-label" htmlFor="redio1"></label>
                    </div>
                </div>

                <p className="text-content">all peoples will be able to see my profile</p>
            </div>

            <div className="privacy-box">
                <div className="d-flex align-items-start">
                    <h6>who has save this profile only that people see my profile</h6>
                    <div className="form-check form-switch switch-radio ms-auto">
                        <input className="form-check-input" type="checkbox" role="switch"
                            id="redio2"/>
                        <label className="form-check-label" htmlFor="redio2"></label>
                    </div>
                </div>

                <p className="text-content">all peoples will not be able to see my profile</p>
            </div>

            <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">Save
                Changes</button>
        </div>

        <div className="dashboard-bg-box mt-4">
            <div className="dashboard-title mb-4">
                <h3>Account settings</h3>
            </div>

            <div className="privacy-box">
                <div className="d-flex align-items-start">
                    <h6>Deleting Your Account Will Permanently</h6>
                    <div className="form-check form-switch switch-radio ms-auto">
                        <input className="form-check-input" type="checkbox" role="switch"
                            id="redio3"/>
                        <label className="form-check-label" htmlFor="redio3"></label>
                    </div>
                </div>
                <p className="text-content">Once your account is deleted, you will be logged out
                    and will be unable to log in back.</p>
            </div>

            <div className="privacy-box">
                <div className="d-flex align-items-start">
                    <h6>Deleting Your Account Will Temporary</h6>
                    <div className="form-check form-switch switch-radio ms-auto">
                        <input className="form-check-input" type="checkbox" role="switch"
                            id="redio4"/>
                        <label className="form-check-label" htmlFor="redio4"></label>
                    </div>
                </div>

                <p className="text-content">Once your account is deleted, you will be logged out
                    and you will be create new account</p>
            </div>

            <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">Delete My
                Account</button>
        </div>
    </div>
    </>
  )
}

export default Privacy