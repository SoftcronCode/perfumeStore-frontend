// 1. Add To Cart Function
// 2. Add to wishlist function
// 3. Delete Wishlist Item
// 4. Delete Cart Item
// 5. Update Cart Qty (increase or decrease)
// 6. Delete Address API Code
// 7. Get User Cart Data API
// 8. Clear User Cart API
// 9. Create Order API
// 10. Update Payment id when payment is successfull
// 11. Cancel Placed Order API
// 12. Update Order Status API
// 13. Move wishlist To Cart Api

// import { useContext } from "react";
import { fetchData } from "./apiService";
import { API_URLS } from "./apiUrls";
import { toast } from "react-toastify";
// import { CartContext } from "../utils/CartContext";

const UserID = localStorage.getItem("user_id");

// 1. Add To Cart Function
export const AddToCart = async (productId, variationId, qty) => {
  const requestBody = {
    productId: productId,
    variationId: variationId,
    qty: qty || 1,
    userId: UserID,
  };

  try {
    const response = await fetchData(API_URLS.addToCart, requestBody);
    if (response.responseCode === 1) {
      const data = JSON.parse(response.responseData);
      const cartQty = data[0].cartItem;
      toast.success(response.responseMessage);
      return cartQty;
    } else {
      // Show error toast
      toast.error(response.responseMessage);
    }
  } catch (error) {
    // Handle error as needed
    toast.error(error.message);
  }
};

// 2. Add to wishlist function
export const AddToWishlist = async (productId, variationId, qty) => {
  const requestBody = {
    productId: productId,
    variationId: variationId,
    qty: qty || 1,
    userId: UserID,
  };

  try {
    const response = await fetchData(API_URLS.addToWishlist, requestBody);
    if (response.responseCode === 1) {
      const data = JSON.parse(response.responseData);
      const wishlistQty = data[0].wishlist_count;
      toast.success(response.responseMessage);
      return wishlistQty;
    } else {
      // Show error toast
      toast.error(response.responseMessage);
    }
  } catch (error) {
    // Handle error as needed
    toast.error(error.message);
  }
};

// 3. Delete Wishlist Item
export const RemoveWishlistItem = async (wishlist_id) => {
  const requestBody = {
    wishlistId: wishlist_id,
    UserId: UserID,
  };

  try {
    const response = await fetchData(API_URLS.deleteWishlistItem, requestBody);

    if (response.responseCode === 1) {
      const data = JSON.parse(response.responseData);
      const wishlistQty = data[0].wishlist_count;
      toast.success(response.responseMessage);
      return wishlistQty;
    } else {
      toast.error(response.responseMessage);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// 4. Delete Cart Item
export const RemoveCartItem = async (cart_id) => {
  const requestBody = {
    cartId: cart_id,
    UserId: UserID,
  };

  try {
    const response = await fetchData(API_URLS.deleteCartItem, requestBody);

    if (response.responseCode === 1) {
      const data = JSON.parse(response.responseData);
      const cartQty = data[0].cart_count;
      toast.success(response.responseMessage);
      return cartQty;
    } else {
      toast.error(response.responseMessage);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// 5. Update Cart Qty (increase or decrease)
export const UpdateProductCartQty = async (qty, cart_id, action) => {
  let set_qty;

  if (action === "increase" && qty < 10) {
    set_qty = qty + 1;
  } else if (action === "decrease" && qty > 1) {
    set_qty = qty - 1;
  }

  if (set_qty !== null && set_qty !== undefined) {
    const requestBody = {
      qty: set_qty,
      cartId: cart_id,
    };

    try {
      const response = await fetchData(
        API_URLS.UpdateProductCartQty,
        requestBody
      );

      if (response.responseCode === 1) {
        toast.success(response.responseMessage);
      } else {
        toast.error(response.responseMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
};

// 6. ************ Delete Address API Code ***************
export const DeleteAddress = async (id) => {
  const requestBody = {
    addressId: id,
  };

  try {
    const response = await fetchData(API_URLS.deleteAddress, requestBody);

    if (response.responseCode === 1) {
      toast.success(response.responseMessage);
    } else {
      toast.error(response.responseMessage);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// 7. ******************** Get User Cart Data API ************************************
export const GetCartData = async (user_id) => {
  const requestGetBody = {
    userId: user_id,
  };

  try {
    const response = await fetchData(API_URLS.getCartItem, requestGetBody);
    if (response.responseCode === 1) {
      const cartData = JSON.parse(response.responseData);
      return cartData;
    } else {
      // Show error toast
      toast.error(`Error: ${response.responseMessage}`);
    }
  } catch (error) {
    // Handle error as needed
    toast.error(`Error: ${error.message}`);
  }
};

// 8. ******************** Clear User Cart API ************************************
export const ClearCart = async (user_id) => {
  const requestBody = {
    UserId: user_id,
  };

  try {
    const response = await fetchData(API_URLS.clearCart, requestBody);

    if (response.responseCode === 1) {
      return true;
    } else {
      toast.error(response.responseMessage);
      return false;
    }
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

// 9. ******************** Create Order API ************************************
export const CreateOrder = async (
  payment_id,
  address_id,
  totalAmt,
  gst,
  shipping,
  setCartQty,
  totalAmountBeforeDiscount,
  discountAmount,
  discountType,
  couponCode
) => {
  const requestBody = {
    UserId: UserID,
    PaymentId: payment_id || 0,
    AddressId: address_id,
    TotalAmount: totalAmt,
    GstAmount: gst,
    ShippingAmount: shipping,
    totalBeforeDiscount: totalAmountBeforeDiscount,
    DiscountAmount: discountAmount,
    DiscountType: discountType,
    CouponCode: couponCode,
  };

  try {
    const response = await fetchData(API_URLS.createOrder, requestBody);
    console.log("243 productAction", requestBody);
    if (response.responseCode === 1) {
      setCartQty(0); // Update cart qty to 0 when order create successfull.
      const data = JSON.parse(response.responseData);
      const OrderId = data[0].order_id;
      return OrderId;
    } else {
      toast.error(response.responseMessage);
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

// 10. ******************** Update Payment id when payment is successfull ************************************
export const UpdatePaymentID = async (order_id, payment_id) => {
  const requestBody = {
    OrderId: order_id,
    PaymentId: payment_id,
  };

  try {
    const response = await fetchData(API_URLS.updatePaymentID, requestBody);

    if (response.responseCode === 1) {
      return true;
    } else {
      toast.error(response.responseMessage);
      return false;
    }
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

export const CancelPlacedOrder = async (order_id, reason) => {
  const requestBody = {
    OrderId: order_id,
    Reason: reason,
  };

  try {
    const response = await fetchData(API_URLS.cancelOrder, requestBody);

    if (response.responseCode === 1) {
      toast.success(response.responseMessage);
    } else {
      toast.error(response.responseMessage);
      return false;
    }
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

// 12. ******************** Update Order Status API  ************************************
export const UpdateOrderStatus = async (order_id, status_id) => {
  const requestBody = {
    OrderId: order_id,
    StatusId: status_id,
  };

  try {
    const response = await fetchData(API_URLS.UpdateOrderStatus, requestBody);

    if (response.responseCode === 1) {
      // toast.success(response.responseMessage, {
      //   toastId: "unique-success-toast",
      // });
      return true;
    } else {
      toast.error(response.responseMessage);
      return false;
    }
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

// 13. ****************** Product Move To Cart Api **************************************
export const MoveWishlistToCart = async (wishlist_id) => {
  const requestBody = {
    wishlistId: wishlist_id,
    UserId: UserID,
  };

  try {
    const response = await fetchData(API_URLS.wishlistToCart, requestBody);
    if (response.responseCode === 1) {
      const data = JSON.parse(response.responseData);
      const cartQty = data[0].cart_count;
      const wishlistQty = data[0].wishlist_count;
      toast.success(response.responseMessage);
      return { cartQty, wishlistQty };
    } else {
      // Show error toast
      toast.error(response.responseMessage);
    }
  } catch (error) {
    // Handle error as needed
    toast.error(error.message);
  }
};

// 14. ******************** Set Address As Default Address API  ************************************
export const SetDefaultAddress = async (address_id) => {
  const requestBody = {
    addressId: address_id,
    userId: UserID,
  };

  try {
    const response = await fetchData(API_URLS.setDefaultAddress, requestBody);
    if (response.responseCode === 1) {
      toast.success(response.responseMessage);
    } else {
      toast.error(response.responseMessage);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// 15. Address Form Submit Function *********************
export const AddressFormSubmit = async (data, mode) => {
  try {
    if (mode === "Add") {
      const requestBody = {
        UserID: data.user_id,
        Name: data.fullname,
        Phone: data.mobileNumber,
        HouseNo: data.houseNo,
        Area: data.area,
        Landmark: data.landmark,
        City: data.city_name,
        State: data.state_name,
        Country: data.country_name,
        ZipCode: data.zipCode,
        CountryId: data.country_id,
        StateId: data.state_id,
        CityId: data.city_id,
      };
      const response = await fetchData(API_URLS.addAddress, requestBody);
      if (response.responseCode === 1) {
        toast.success(response.responseMessage);
      } else {
        toast.error(response.responseMessage);
      }
    } else if (mode === "Edit") {
      const requestBody = {
        AddressId: data.hdnField_productId,
        Name: data.fullname,
        Phone: data.mobileNumber,
        HouseNo: data.houseNo,
        Area: data.area,
        Landmark: data.landmark,
        City: data.city_name,
        State: data.state_name,
        Country: data.country_name,
        ZipCode: data.zipCode,
        CountryId: data.country_id,
        StateId: data.state_id,
        CityId: data.city_id,
      };
      const response = await fetchData(API_URLS.updateAddress, requestBody);
      if (response.responseCode === 1) {
        toast.success(response.responseMessage);
      } else {
        toast.error(response.responseMessage);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle 401 error
      alert("User not authenticated. Please login first.");
      window.location.href = "/login";
    } else {
      toast.error(`Error: ${error.message}`);
    }
  }
};
