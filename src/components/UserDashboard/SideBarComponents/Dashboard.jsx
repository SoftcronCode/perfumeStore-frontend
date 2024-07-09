import React, { useState, useEffect } from 'react';
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import { toast } from "react-toastify";

const Dashboard = () => {

    const UserId = localStorage.getItem('user_id');
    const Username = localStorage.getItem('username');

    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const requestBody = {
                userId: UserId,
            };

            try {
                const response = await fetchData(API_URLS.userActivityData, requestBody);
                if (response.responseCode === 1) {
                    const data = JSON.parse(response.responseData);
                    setDashboardData(data);
                } else {
                    toast.error(`Error: ${response.responseMessage}`);
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };

        fetchDashboardData();
    }, [UserId]);




    return (
        <>
            <div className="dashboard-home">
                <div className="title">
                    <h2>My Dashboard</h2>
                    <span className="title-leaf">
                        <svg className="icon-width bg-gray">
                            <use xlinkHref="/assets/svg/leaf.svg" />
                        </svg>
                    </span>
                </div>
                <div className="dashboard-user-name">
                    <h6 className="text-content">Hello, <b className="text-title">{Username}</b></h6>
                    <p className="text-content">From your My Account Dashboard you have the ability to
                        view a snapshot of your recent account activity and update your account
                        information. Select a link below to view or edit information.</p>
                </div>

                <div className="total-box">
                    <div className="row g-sm-4 g-3">
                        <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                            <div className="totle-contain">
                                <img src="/assets/images/svg/order.svg" className="img-1 blur-up lazyload" alt="order-svg" />
                                <img src="/assets/images/svg/order.svg" className="blur-up lazyload" alt="order-svg" />
                                <div className="totle-detail">
                                    <h5>Total Complete Order</h5>
                                    <h3>{dashboardData.length > 0 ? dashboardData[0].complete_order_count || 0 : 0}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                            <div className="totle-contain">
                                <img src="/assets/images/svg/pending.svg" className="img-1 blur-up lazyload" alt="pending-svg" />
                                <img src="/assets/images/svg/pending.svg" className="blur-up lazyload" alt="pending-svg" />
                                <div className="totle-detail">
                                    <h5>Total Pending Order</h5>
                                    <h3>{dashboardData.length > 0 ? dashboardData[0].pending_order_count || 0 : 0}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                            <div className="totle-contain">
                                <img src="/assets/images/svg/wishlist.svg" className="img-1 blur-up lazyload" alt="wishlist-svg" />
                                <img src="/assets/images/svg/wishlist.svg" className="blur-up lazyload" alt="wishlist-svg" />
                                <div className="totle-detail">
                                    <h5>Total Wishlist</h5>
                                    <h3>{dashboardData.length > 0 ? dashboardData[0].wishlist_count || 0 : 0}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard