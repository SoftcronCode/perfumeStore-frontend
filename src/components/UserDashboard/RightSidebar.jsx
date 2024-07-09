import React from 'react'
import Dashboard from '../UserDashboard/SideBarComponents/Dashboard';
import Wishlist from '../UserDashboard/SideBarComponents/Wishlist';
import Order from '../UserDashboard/SideBarComponents/Order';
import Address from '../UserDashboard/SideBarComponents/Address';
import Profile from '../UserDashboard/SideBarComponents/Profile';
import Privacy from '../UserDashboard/SideBarComponents/Privacy';

const RightSidebar = () => {
  return (
    <>
    <button className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show Menu</button>
    <div className="dashboard-right-sidebar">
        <div className="tab-content" id="pills-tabContent">
            {/* Dashboard Tab start */}
            <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel" aria-labelledby="pills-dashboard-tab">
              <Dashboard/>
            </div>
            {/* Dashboard Tab End */}

            {/* Wishlist Tab Start */}
            <div className="tab-pane fade show" id="pills-wishlist" role="tabpanel" aria-labelledby="pills-wishlist-tab">
                <Wishlist/>
            </div>
            {/* Wishlist Tab End */}

            {/* Order Tab Start */}
            <div className="tab-pane fade show" id="pills-order" role="tabpanel" aria-labelledby="pills-order-tab">
                <Order/>
            </div>
            {/* Order Tab End */}

            {/* Address Tab Start */}
            <div className="tab-pane fade show" id="pills-address" role="tabpanel" aria-labelledby="pills-address-tab">
                <Address/>
            </div>
            {/* Address Tab End */}

            {/* Profile Tab Start */}
            <div className="tab-pane fade show" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <Profile/>
            </div>
            {/* Profile Tab End */}

            {/* Privacy Tab Start */}
            <div className="tab-pane fade show" id="pills-security" role="tabpanel" aria-labelledby="pills-security-tab">
                <Privacy/>
            </div>
            {/* Privacy Tab End */}
        </div>
    </div>
    </>
  )
}

export default RightSidebar