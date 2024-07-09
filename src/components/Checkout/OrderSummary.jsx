import React from "react";
import { Link } from "react-router-dom";

import { PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";

const OrderSummary = ({ handlePlaceOrder, cartItems }) => {

    // Function to calculate shipping amount according to shipping weight.
    const calculateShippingCharge = (totalOrderWeight) => {
        const baseCharge = 80;
        const weightInKg = totalOrderWeight / 1000;
        const wholeKg = Math.ceil(weightInKg);
        return baseCharge * wholeKg;
    };

    let subTotal = 0;
    let totalOrderWeight = 0;
    let gstAmount = 0;

    if (cartItems && cartItems.length > 0) {
        cartItems.forEach((data) => {
            const productTotal = (data.product_price * data.cart_qty);  // get product total amount.
            subTotal += productTotal;                                   // get subtotal amount.
            const gstPercent = data.product_gst;                            // get gst percentage.
            totalOrderWeight += (data.shipping_weight * data.cart_qty);             // get total order weight.
            gstAmount += (productTotal * gstPercent) / (100 + gstPercent);          // get total gst amount.
        });
    }

    const shippingAmount = calculateShippingCharge(totalOrderWeight);               // get total shipping amount.
    const remainingWeight = Math.ceil(totalOrderWeight / 1000) * 1000 - totalOrderWeight;           // get remaining shipping weight.
    const grandTotal = subTotal + shippingAmount;

    return (
        <>
            <div className="summery-box">
                <div className="summery-header">
                    <h3>Order Summery</h3>
                </div>

                {cartItems && cartItems.map((data) => {
                    return (
                        <ul class="summery-contain" key={data.cart_id}>
                            <li>
                                <img src={`${PRODUCT_IMG_BASE_URL}${data.product_image}`} class="img-fluid blur-up lazyloaded checkout-image w--10" alt={data.product_name} />
                                <div>
                                    <h4 className="w--70">{data.product_name} <span>X {data.cart_qty}</span></h4>
                                    <span>Color : {data.product_color}</span>
                                    {" | "}
                                    <span>Size : {data.product_size}</span>
                                </div>
                                <h4 class="price w--20 text-end">₹ {(data.product_price * data.cart_qty).toFixed(2)}</h4>
                            </li>
                        </ul>
                    );
                })}

                <div className="summery-contain">
                    <ul>
                        <li>
                            <h4>Subtotal</h4>
                            <h4 className="price">₹ {subTotal.toFixed(2)}</h4>
                        </li>
                        <li>
                            <h4>Shipping</h4>
                            <h4 className="price">₹ {shippingAmount.toFixed(2)}</h4>
                        </li>
                        <li>
                            <h4>GST (Included)</h4>
                            <h4 className="price">₹ {gstAmount.toFixed(2)}</h4>
                        </li>
                        <li>
                            <p>(Your order total weight is {totalOrderWeight}gms, you can add more {remainingWeight}gms of products under same shipping charge)</p>
                        </li>
                    </ul>
                </div>
                <ul className="summery-total">
                    <li className="list-total border-top-0">
                        <h4>Total (INR)</h4>
                        <h4 className="price theme-color">₹ {grandTotal.toFixed(2)}</h4>
                    </li>
                </ul>
            </div>
            <div className="button-group checkout1-button">
                <ul>
                    <li>
                        <button className="btn theme-bg-color text-white btn-md w-100 mt-0 fw-bold fs-6" 
                        onClick={() => handlePlaceOrder(grandTotal.toFixed(2), gstAmount.toFixed(2), shippingAmount.toFixed(2))}> Place Order </button>
                    </li>
                    <li>
                        <Link to="/cart" className="btn shopping-button text-dark return-shopping-btn"> <i className="fa-solid fa-arrow-left-long me-3" />
                            Return To Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default OrderSummary