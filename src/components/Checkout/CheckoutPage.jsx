import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../shared/Breadcrumb";
import CheckoutOption from "./CheckoutOption";
import OrderSummary from "./OrderSummary";
import { toast } from "react-toastify";
import {
  CreateOrder,
  GetCartData,
  UpdatePaymentID,
  UpdateOrderStatus,
} from "../../api/productActions";
import { CartContext } from "../../utils/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartQty } = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isCodAvailable, setIsCodAvailable] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const totalAfterDiscount = queryParams.get("totalAfterDiscount");
  const totalAmount = queryParams.get("totalAmount");

  const discountAmount = queryParams.get("discountAmount");
  const discountType = queryParams.get("discountType");
  const couponCode = queryParams.get("couponCode");

  const UserId = localStorage.getItem("user_id");
  const Username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartData = (await GetCartData(UserId)) ?? [];
        if (!cartData || cartData.length === 0) {
          toast.error("Error: First Add Some Item To Cart");
          navigate("/");
          return;
        }
        setCartItems(cartData);
        const isCodAvailableInCart =
          cartData?.some((item) => item.cod === 0) ?? false;
        setIsCodAvailable(isCodAvailableInCart);
      } catch (error) {
        toast.error(`Error: ${error.message}`);
        console.log("46", error);
      }
    };
    fetchCartItems();
  }, [UserId, navigate]);

  const handlePlaceOrder = async (
    amt,
    gst,
    shipping,
    totalAmountBeforeDiscount,
    discountAmount,
    discountType,
    couponCode
  ) => {
    if (Username === null || Username === undefined) {
      toast.error("Error: Please Login First.", {
        toastId: "unique-error-toast",
      });
      navigate("/login");
      return;
    }

    if (!selectedAddress && !selectedPayment) {
      toast.error("Error: Please select address and payment options.");
      return;
    } else if (!selectedAddress) {
      toast.error("Error: Please select address first.");
      return;
    } else if (!selectedPayment) {
      toast.error("Error: Please select payment option first.");
      return;
    } else if (selectedPayment === "cash") {
      const orderCreated = await CreateOrder(
        "cod",
        selectedAddress,
        amt,
        gst,
        shipping,
        setCartQty,
        totalAmountBeforeDiscount,
        discountAmount,
        discountType,
        couponCode
      );

      if (orderCreated) {
        navigate("/order");
      }
    } else if (selectedPayment === "online") {
      const orderId = await CreateOrder(
        "0",
        selectedAddress,
        amt,
        gst,
        shipping,
        setCartQty,
        totalAmountBeforeDiscount,
        discountAmount,
        discountType,
        couponCode
      );

      if (orderId !== null) {
        const amountInPaise = Math.round(amt * 100); // Convert to paise
        const options = {
          key: "rzp_test_vTCR7JkBfoLIe0",
          amount: amountInPaise,
          currency: "INR",
          name: "Zordik India",
          description: "Ecommerce",
          image: "/assets/images/logo/logo.png",
          handler: async function (response) {
            const payment_id = response.razorpay_payment_id;
            console.log(response);

            if (payment_id !== null && payment_id !== undefined) {
              const success = await UpdatePaymentID(orderId, payment_id);
              if (success) {
                navigate("/order");
              }
            } else {
              const UpdatesOrderStatus = await UpdateOrderStatus(orderId, 0);
              if (UpdatesOrderStatus) {
                // Do not navigate here, just update status
                console.log("Order status updated to 0");
              }
            }
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async function () {
              const UpdatesOrderStatus = await UpdateOrderStatus(orderId, 0);
              if (UpdatesOrderStatus) {
                console.log("Order status updated to 0");
              }
            },
          },
        };
        var rzp = new window.Razorpay(options);
        rzp.open();
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Checkout" />
      <section className="checkout-section-2 section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-lg-8">
              <CheckoutOption
                setSelectedAddress={setSelectedAddress}
                setSelectedPayment={setSelectedPayment}
                isCodAvailable={isCodAvailable}
              />
            </div>
            <div className="col-lg-4">
              <OrderSummary
                handlePlaceOrder={handlePlaceOrder}
                cartItems={cartItems}
                totalAfterDiscount={totalAfterDiscount}
                totalAmountBeforeDiscount={totalAmount}
                discountAmount={discountAmount}
                discountType={discountType}
                couponCode={couponCode}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
