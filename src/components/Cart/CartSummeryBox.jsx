import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";

const CartSummeryBox = ({ cartItems }) => {
  const UserId = localStorage.getItem("user_id");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null); // State to hold discounted total
  const [message, setMessage] = useState(""); // State to hold response message
  const [couponCode, setCouponCode] = useState("");

  const [discountAmount, setDiscountAmount] = useState(null);
  const [discountType, setDiscountType] = useState(null);

  const totalAmount = cartItems
    ? cartItems.reduce(
        (total, cart) => total + cart.cart_qty * cart.product_price,
        0
      )
    : 0;

  let totalPrice = totalAmount;
  let user_id = UserId;

  function applyingCoupon() {
    axios
      .post(API_URLS.discountCoupon, { couponCode, totalPrice, user_id })
      .then((response) => {
        const { totalAfterDiscount, discountAmount, discountType } =
          response.data.responseObject[0];
        const { responseMessage } = response.data;

        setTotalAfterDiscount(totalAfterDiscount);
        setDiscountAmount(discountAmount);
        setDiscountType(discountType);

        setMessage(responseMessage);
        setShowCouponInput(false);
      })
      .catch((error) => {
        toast.error("Error applying coupon:", error);
        setMessage("Error applying coupon. Please try again.");
      });
  }

  const handleApplyCouponClick = () => {
    setShowCouponInput(!showCouponInput);
  };

  const handleCouponInputChange = (e) => {
    setCouponCode(e.target.value);
  };
  // const handleCheckout = () => {
  //   navigate("/checkout", { state: { totalAfterDiscount } });
  // };

  return (
    <>
      <div className="summery-box p-sticky">
        <div className="summery-header">
          <h3>Cart Total</h3>
        </div>
        <div className="summery-contain">
          <ul>
            <li>
              <h4>Subtotal</h4>
              <h4 className="price">₹ {totalAmount.toFixed(2)}</h4>
            </li>
          </ul>
        </div>
        {totalAfterDiscount !== null && (
          <ul className="summery-total">
            <li className="list-total border-top-0">
              <h4>Total After Discount (INR)</h4>
              <h4 className="price theme-color">₹ {totalAfterDiscount}</h4>
            </li>
          </ul>
        )}
        <div className="button-group cart-button">
          <ul>
            {showCouponInput && (
              <li>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={handleCouponInputChange}
                  className="coupon-input py-2 w-100"
                />
                <button
                  className="btn btn-success mt-2"
                  onClick={() => applyingCoupon()}
                >
                  Apply Coupon
                </button>
              </li>
            )}
            <li>
              <button
                className="btn btn-info  fw-bold"
                onClick={handleApplyCouponClick} // Call applyCoupon function on button click
              >
                Have Coupon?
              </button>
            </li>
            <li>
              <Link
                className="btn btn-animation proceed-btn fw-bold checkout-button"
                to={`/checkout?totalAfterDiscount=${totalAfterDiscount}&totalAmount=${totalAmount}&discountType=${discountType}&discountAmount=${discountAmount}&couponCode=${couponCode}`}
              >
                Process To Checkout
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="btn shopping-button text-dark return-shopping-btn"
              >
                <i className="fa-solid fa-arrow-left-long me-3" />
                Return To Shopping
              </Link>
            </li>
          </ul>
        </div>
        {message && (
          <div className="message text-center">
            <p className="text-center">{message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSummeryBox;
