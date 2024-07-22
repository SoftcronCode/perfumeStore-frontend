import React from "react";
import { Link } from "react-router-dom";
import { PRODUCT_IMG_BASE_URL } from "../../api/apiUrls";

const OrderSummary = ({
  handlePlaceOrder,
  cartItems,
  totalAfterDiscount,
  totalAmountBeforeDiscount,
  discountAmount,
  discountType,
  couponCode,
}) => {
  const calculateShippingCharge = (totalOrderWeight) => {
    const baseCharge = 80;
    const weightInKg = totalOrderWeight / 1000;
    const wholeKg = Math.ceil(weightInKg);
    return baseCharge * wholeKg;
  };

  console.log("21 orderSummary", discountAmount, discountType, couponCode);

  let subTotal = 0;
  let totalOrderWeight = 0;
  let gstAmount = 0;
  let gstPercent;

  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((data) => {
      const productTotal = data.product_price * data.cart_qty; // get product total amount.
      subTotal += productTotal; // get subtotal amount.
      gstPercent = data.product_gst; // get gst percentage.
      totalOrderWeight += data.shipping_weight * data.cart_qty; // get total order weight.
      gstAmount += (productTotal * gstPercent) / (100 + gstPercent); // get total gst amount.
    });
  }

  const shippingAmount = calculateShippingCharge(totalOrderWeight); // get total shipping amount.
  const remainingWeight =
    Math.ceil(totalOrderWeight / 1000) * 1000 - totalOrderWeight; // get remaining shipping weight.
  const grandTotal = subTotal + shippingAmount + gstAmount;
  // console.log("gstPercentage: ", gstPercent);

  const totalAfterDiscountNdCharges =
    parseFloat(shippingAmount.toFixed(2)) +
    parseFloat(gstAmount.toFixed(2)) +
    parseFloat(totalAfterDiscount);

  return (
    <>
      <div className="summery-box">
        <div className="summery-header">
          <h3>Order Summary</h3>
        </div>

        {cartItems &&
          cartItems.map((data) => (
            <ul className="summery-contain" key={data.cart_id}>
              <li>
                <img
                  src={`${PRODUCT_IMG_BASE_URL}${data.product_image}`}
                  className="img-fluid blur-up lazyloaded checkout-image w--10"
                  alt={data.product_name}
                />
                <div>
                  <h4 className="w--70">
                    {data.product_name} <span>X {data.cart_qty}</span>
                  </h4>
                  <span>Color : {data.product_color}</span>
                  {" | "}
                  <span>Size : {data.product_size}</span>
                </div>
                <h4 className="price w--20 text-end">
                  ₹ {(data.product_price * data.cart_qty).toFixed(2)}
                </h4>
              </li>
            </ul>
          ))}

        <div className="summery-contain">
          <ul>
            <li>
              <h4>Subtotal</h4>
              <h4 className="price">
                ₹ {subTotal ? subTotal : totalAfterDiscount}
              </h4>
            </li>
            <li>
              <h4>Shipping</h4>
              <h4 className="price">₹ {shippingAmount.toFixed(2)}</h4>
            </li>
            <li>
              <h4>GST (Included)</h4>
              <h4 className="price">
                ₹ {gstAmount.toFixed(2)} ({gstPercent}%)
              </h4>
            </li>
            <li>
              <p>
                (Your order total weight is {totalOrderWeight}gms, you can add
                more {remainingWeight}gms of products under same shipping
                charge)
              </p>
            </li>
          </ul>
        </div>
        <ul className="summery-total">
          <li className="list-total border-top-0">
            <h4>Total</h4>
            <h4 className="price">₹ {grandTotal.toFixed(2)}</h4>
          </li>
          {!totalAfterDiscount ? (
            <li className="list-total border-top-0">
              <h4>Total (After Discount)</h4>
              <h4 className="ms-auto">
                ₹
                {(
                  parseFloat(totalAfterDiscount) +
                  parseFloat(shippingAmount) +
                  parseFloat(gstAmount)
                ).toFixed(2)}
              </h4>

              {/* <h4>Saved ₹{subTotal - totalAfterDiscount}</h4> */}
            </li>
          ) : (
            ""
          )}
        </ul>
        {!totalAfterDiscount ? (
          <h4 className="ms-3">
            Saved:{" "}
            <span className="fw-bold">₹{subTotal - totalAfterDiscount}</span>
          </h4>
        ) : (
          ""
        )}
      </div>
      <div className="button-group checkout1-button">
        <ul>
          <li>
            <button
              className="btn theme-bg-color text-white btn-md w-100 mt-0 fw-bold fs-6"
              onClick={() =>
                handlePlaceOrder(
                  totalAfterDiscountNdCharges || grandTotal.toFixed(2),
                  gstAmount.toFixed(2),
                  shippingAmount.toFixed(2),
                  totalAmountBeforeDiscount,
                  discountAmount || 0,
                  discountType || "none",
                  couponCode || "none"
                )
              }
            >
              {" "}
              Place Order{" "}
            </button>
          </li>
          <li>
            <Link
              to="/cart"
              className="btn shopping-button text-dark return-shopping-btn"
            >
              {" "}
              <i className="fa-solid fa-arrow-left-long me-3" />
              Return To Cart
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OrderSummary;
