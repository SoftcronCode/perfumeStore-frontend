import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../shared/Breadcrumb';
import CheckoutOption from './CheckoutOption';
import OrderSummary from './OrderSummary';
import { toast } from "react-toastify";
import { CreateOrder, GetCartData, UpdatePaymentID, UpdateOrderStatus } from '../../api/productActions';
import { CartContext } from '../../utils/CartContext';

const CheckoutPage = () => {

    const navigate = useNavigate();
    const { setCartQty } = useContext(CartContext);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isCodAvailable, setIsCodAvailable] = useState(false);
    const [cartItems, setCartItems] = useState([]);


    // ************* Get Cart API Code Start *********************

    const UserId = localStorage.getItem('user_id');
    const Username = localStorage.getItem('username');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartData = await GetCartData(UserId) ?? [];
                if(!cartData || cartData.length === 0){
                    toast.error("Error: First Add Some Item To Cart");
                    navigate('/');
                    return;
                }
                setCartItems(cartData);
                // Check if any product has cod === 1
                const isCodAvailableInCart = cartData?.some(item => item.cod === 0) ?? false;
                setIsCodAvailable(isCodAvailableInCart);
            }
            catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };

        fetchCartItems();
    }, [UserId, navigate]);

    // ************* Get Cart API Code End *********************



    // ********************* Function call when Place Order Button Click ***************************************
    const handlePlaceOrder = async (amt, gst, shipping) => {
        if(Username === null || Username === undefined){
            toast.error("Error: Please Login First.", {
                toastId: "unique-error-toast"
            });
            navigate('/login');
            return;
        }

        if (!selectedAddress && !selectedPayment) {
            toast.error("Error: Please select address and payment options.");
            return;
        }
        else if (!selectedAddress) {
            toast.error("Error: Please select address first.");
            return;
        }
        else if (!selectedPayment) {
            toast.error("Error: Please select payment option first.");
            return;
        }

        else if (selectedPayment === 'cash') {
            const orderCreated = await CreateOrder('cod', selectedAddress, amt, gst, shipping, setCartQty);
            if (orderCreated) {
                navigate("/order");
            }
        }
        else if (selectedPayment === 'online') {

            const orderId = await CreateOrder('0',selectedAddress, amt, gst, shipping, setCartQty);
            if (orderId !== null) {

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
                                navigate("/order"); 
                            }
                        }
                        else{
                            const UpdatesOrderStatus = await UpdateOrderStatus(orderId, 0);
                            if (UpdatesOrderStatus) {
                                navigate("/confirm-order"); 
                            }                            
                        }
                    },
                    theme: {
                        "color": "#3399cc"
                    },
                    modal : {
                        ondismiss: async function(){
                            const UpdatesOrderStatus = await UpdateOrderStatus(orderId, 0);
                            if (UpdatesOrderStatus) {
                                navigate("/confirm-order"); 
                            } 
                        }
                    }
                };
                var rzp = new window.Razorpay(options);
                rzp.open();
            }
        }
    }
    // ****************************************************************************************

    return (
        <>
            <Breadcrumb pageName="Checkout" />
            <section className="checkout-section-2 section-b-space">
                <div className="container-fluid-lg">
                    <div className="row g-sm-4 g-3">
                        <div className="col-lg-8">
                            <CheckoutOption setSelectedAddress={setSelectedAddress} setSelectedPayment={setSelectedPayment} isCodAvailable={isCodAvailable} />
                        </div>
                        <div className="col-lg-4">
                            <OrderSummary handlePlaceOrder={handlePlaceOrder} cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CheckoutPage;