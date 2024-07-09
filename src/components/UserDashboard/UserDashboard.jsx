import React, {useEffect } from "react";
import Breadcrumb from '../shared/Breadcrumb';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useNavigate } from "react-router-dom";
import AddAddressModal from '../PopupModal/AddAddressModal';
import EditProfileModal from '../PopupModal/EditProfileModal';
import RemoveBoxModal from '../PopupModal/RemoveBoxModal';
import TopDealModal from '../PopupModal/TopDealModal';

const UserDashboard = () => {

    const navigate = useNavigate(); 
    const SessionUsername = localStorage.getItem('username');

    useEffect(() => {
        // Redirect to login if username is null or empty
        if (!SessionUsername) {
            navigate("/login");
        }
    }, [SessionUsername, navigate]);

  return (    
    <>
    <Breadcrumb pageName="User Dashboard" />
    <section className="user-dashboard-section section-b-space">
        <div className="container-fluid-lg">
            <div className="row">
                <div className="col-xxl-3 col-lg-4">
                    <LeftSidebar/>
                </div>
                <div className="col-xxl-9 col-lg-8">
                    <RightSidebar/>
                </div>
            </div>
        </div>
    </section>


    {/* PopUp Modals */}
   
    <EditProfileModal/>
    <RemoveBoxModal/>
    <TopDealModal/>
    </>
  )
}

export default UserDashboard