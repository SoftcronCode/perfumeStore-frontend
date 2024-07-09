import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import { toast } from "react-toastify";
import { PRODUCT_IMG_BASE_URL } from '../../../api/apiUrls';
import { format } from 'date-fns';
import OrderCancelModal from '../../PopupModal/OrderCancelModal';
import { UpdatePaymentID } from '../../../api/productActions';


const Order = () => {
    const navigate = useNavigate();

    // **************************** Get User Order API Code Start ***********************************
    const UserId = localStorage.getItem('user_id');
    const [cancelOrderId, setCancelOrderId] = useState(null);

    const [userOrder, setUserOrder] = useState([]);

    useEffect(() => {
        const fetchUserOrder = async () => {
            const requestBody = {
                userId: UserId,
            };

            try {
                const response = await fetchData(API_URLS.getUserOrders, requestBody);
                if (response.responseCode === 1) {
                    const data = JSON.parse(response.responseData);
                    setUserOrder(data);
                } else {
                    toast.error(`Error: ${response.responseMessage}`, {
                        toastId: "unique-error-toast",
                    });
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`, {
                    toastId: "unique-error-toast",
                });
            }
        };
        fetchUserOrder();
    }, [UserId]);

    // **************************** Get User Order API Code Start ***********************************



    //*************************************  Function to handle cancel button click ***************************/
    const handleCancelClick = (orderId) => {
        setCancelOrderId(orderId);
    };
    //******************************************************************************************************** */


    //******************************* Handle Payment Button Click ************************************ */
    const handlePaymentClick = (orderId, amt) => {
        const options = {
            key: 'rzp_test_vTCR7JkBfoLIe0',
            amount: amt * 100,
            currency: 'INR',
            name: 'Zordik India',
            description: 'Ecommerce',
            image: '/assets/images/logo/logo.png',
            handler: async function (response) {
                const payment_id = response.razorpay_payment_id;
                console.log(response);

                if (payment_id !== null && payment_id !== undefined) {
                    const success = await UpdatePaymentID(orderId, payment_id);
                    if (success) {
                        toast.success(`Payment Successfull !`, {
                            toastId: "unique-error-toast",
                        });
                    }
                }
            },
            theme: {
                "color": "#3399cc"
            }
        };
        var rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        <>
            <div className="dashboard-order">
                <div className="title">
                    <h2>My Orders History</h2>
                    <span className="title-leaf title-leaf-gray"></span>
                </div>

                <div className="order-contain">
                    {userOrder && userOrder.length > 0 ? (
                        userOrder.map((order) => {
                            const items = JSON.parse(order.items);
                            return (
                                <div className="order-box dashboard-bg-box" key={order.id}>
                                    <div className="order-container">
                                        <div className="order-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        </div>

                                        <div className="order-detail flex-grow-1">
                                            <div className='d-flex'>
                                                {order.order_status === 0 && <h4>Status <span className="badge bg-warning">Payment Pending</span></h4>}
                                                {order.order_status === 1 && <h4>Status <span className="badge bg-info">Processing</span></h4>}
                                                {order.order_status === 2 && <h4>Status <span className="badge bg-primary">Shipped/Dispatch</span></h4>}
                                                {order.order_status === 3 && <h4>Status <span className="badge bg-success">Delivered</span></h4>}
                                                {order.order_status === 4 && <h4>Status <span className="badge bg-danger">Cancelled</span></h4>}
                                                {order.order_status === 5 && <h4>Status <span className="badge bg-danger">Cancel By Admin</span></h4>}
                                                {order.payment_id === 0 && <h4><span className="badge bg-danger ms-2">Payment Failed</span></h4>}
                                                {order.payment_id === 'cod' && <h4><span className="badge bg-warning ms-2">COD</span></h4>}
                                                {order.payment_id !== 0 && order.payment_id !== 'cod' && <h4><span className="badge bg-success ms-2">Paid : {order.payment_id}</span></h4>}
                                                {order.order_status === 2 && <h4><span className="badge bg-light text-dark">Tracking ID : {order.tracking_id ?? 'N/A'} </span></h4>}
                                                {order.order_status === 2 && <h4><span className="badge bg-light text-dark">Courier Name : {order.courier_name ?? 'N/A'} </span></h4>}
                                            </div>
                                            <h6>Date : {format(new Date(order.order_date), 'dd-MMM-yyyy')}</h6>
                                        </div>
                                        {order.order_status === 0 && <button className="btn btn-md text-white theme-bg-color" onClick={() => handlePaymentClick(order.id, order.total_amount)}>Make Payment</button>}
                                        {(order.order_status === 0 || order.order_status === 1) && <button className="btn btn-md text-white bg-danger" data-bs-toggle="modal" data-bs-target="#cancelReason" onClick={() => handleCancelClick(order.id)}>Cancel</button>}
                                        {order.order_status === 3 && <button className="btn btn-md text-white bg-secondary">Return</button>}
                                    </div>

                                    {items.map((item, index) => (
                                        <div className="product-order-detail">
                                            <a href="!#" className="order-image">
                                                <img src={`${PRODUCT_IMG_BASE_URL}${item.product_image}`} className="blur-up lazyload" height={100} width={100} alt={item.product_name} />
                                            </a>

                                            <div className="order-wrap">
                                                <a href="!#">
                                                    <h3>{item.product_name}</h3>
                                                </a>
                                                <div className="row">
                                                    <div className="col-lg-6 col-12">
                                                        <ul className="product-size">
                                                            <li>
                                                                <div className="size-box">
                                                                    <h6 className="text-content">Quantity : </h6>
                                                                    <h5>{item.qty} Unit</h5>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div className="size-box">
                                                                    <h6 className="text-content">Price : </h6>
                                                                    <h5>₹{item.price}</h5>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-lg-6 col-12 mt-1 mt-lg-0">
                                                        <ul className="product-size">
                                                            <li>
                                                                <div className="size-box">
                                                                    <h6 className="text-content">Amount : </h6>
                                                                    <h5>₹{item.price * item.qty}</h5>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="size-box">
                                                                    <h6 className="text-content">Color/Size : </h6>
                                                                    <h5>{item.color} / {item.size}</h5>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="product-order-detail">
                                        <div className="order-wrap w-100">
                                            <div className="row">
                                                <div className="col-lg-4 col-12 mt-1 mt-lg-0">
                                                    <ul className="product-size">
                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Shipping : </h6>
                                                                <h5>₹{order.shipping}</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-lg-4 col-12 mt-1 mt-lg-0">
                                                    <ul className="product-size">
                                                         <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Grand Total : </h6>
                                                                <h5>₹{order.total_amount}</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-lg-4 col-12 mt-1 mt-lg-0">
                                                    <ul className="product-size">                                                       
                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">GST(Included) : </h6>
                                                                <h5>₹{order.gst}</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center w-100">
                            <img src="/assets/images/theme/no-orders.png" className="img-fluid" alt="no-order-yet" />
                            <div className="contain-404 mt-3">
                                <h3 className="text-content">Looks like you have not place any order.</h3>
                                <Link to="/" className="btn btn-md text-white theme-bg-color mt-4 mx-auto width-fit-content">Go For Shopping</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <OrderCancelModal orderId={cancelOrderId} />
        </>
    )
}

export default Order