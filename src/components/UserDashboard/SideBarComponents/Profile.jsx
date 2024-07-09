import React from 'react'

const Profile = () => {
  return (
    <>
        <div className="dashboard-profile">
            <div className="title">
                <h2>My Profile</h2>
                <span className="title-leaf">
                {/* <svg classname="icon-width bg-gray">
                    <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf" />
                </svg> */}
                </span>
            </div>

            <div className="profile-about dashboard-bg-box">
                <div className="row">
                    <div className="col-xxl-7">
                        <div className="dashboard-title mb-3">
                            <h3>Vicki E. Pope</h3>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Email :</td>
                                        <td>
                                            <a href="javascript:void(0)"> mailto:vicki.pope@gmail.com</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number :</td>
                                        <td>
                                            <a href="javascript:void(0)"> +91 846 - 547 -210</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Password :</td>
                                        <td>
                                            <a href="javascript:void(0)">●●●●●●</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white" data-bs-toggle="modal"
                                data-bs-target="#editProfile">Edit Profile</button>
                        </div>
                    </div>

                    <div className="col-xxl-5">
                        <div className="profile-image">
                            <img src="../assets/images/inner-page/dashboard-profile.png"
                                className="img-fluid blur-up lazyload" alt=""/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Profile