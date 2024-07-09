import React, { useEffect, useState } from "react";
import CartTable from './CartTable';
import CartSummeryBox from './CartSummeryBox';
import Breadcrumb from "../shared/Breadcrumb";
import { toast } from "react-toastify";
import { GetCartData } from "../../api/productActions";

const Cart = () => {

    // ************* Get Cart API Code Start *********************
    
    const UserId = localStorage.getItem('user_id');
    const [getCartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartData = await GetCartData(UserId);
                setCartItems(cartData);
            }
            catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };

            fetchCartItems();
        }, [getCartItems, UserId]);

    // ************* Get Cart API Code End *********************

    return (
        <>
            <Breadcrumb pageName="Cart" />
            <section className="cart-section section-b-space">
                <div className="container-fluid-lg">
                    <div className="row g-sm-5 g-3">
                        <div className="col-xxl-9">
                            <CartTable cartItems={getCartItems} />
                        </div>
                        <div className="col-xxl-3">
                            <CartSummeryBox cartItems={getCartItems} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart