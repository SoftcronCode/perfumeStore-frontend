import React from 'react';

const LeftSidebar = () => {

    const handleLogout = () => {
        sessionStorage.clear(); 
        localStorage.clear();
        window.location.href = "/login";
    };

    const UserName = localStorage.getItem('username');
    const UserEmail = localStorage.getItem('user_email');

  return (
    <>
        <div className="dashboard-left-sidebar">
            <div className="close-button d-flex d-lg-none">
                <button className="close-sidebar">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="profile-box">
                <div className="cover-image">
                    <img src="/assets/images/inner-page/cover-img.jpg" className="img-fluid blur-up lazyload"
                        alt=""/>
                </div>

                <div className="profile-contain">
                    <div className="profile-image">
                        <div className="position-relative">
                            <img src="../assets/images/inner-page/user/1.jpg"
                                className="blur-up lazyload update_img" alt=""/>
                            <div className="cover-icon">
                                <i className="fa-solid fa-pen">
                                    <input type="file"/>
                                </i>
                            </div>
                        </div>
                    </div>

                    <div className="profile-name">
                        <h3>{UserName}</h3>
                        <h6 className="text-content">{UserEmail}</h6>
                    </div>
                </div>
            </div>

            <ul className="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-dashboard-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-dashboard" type="button" role="tab"
                        aria-controls="pills-dashboard" aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        DashBoard</button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-order-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-order" type="button" role="tab" aria-controls="pills-order"
                        aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            Order</button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-wishlist-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-wishlist" type="button" role="tab"
                        aria-controls="pills-wishlist" aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        Wishlist</button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-address" type="button" role="tab"
                        aria-controls="pills-address" aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Address</button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile" type="button" role="tab"
                        aria-controls="pills-profile" aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Profile</button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-security-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-security" type="button" role="tab"
                        aria-controls="pills-security" aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        Privacy</button>
                </li>
                <li className="nav-item">
                    <button className='nav-link' type='button' onClick={handleLogout}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="feather"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout</button>
                </li>
            </ul>
        </div>
    </>
  )
}

export default LeftSidebar