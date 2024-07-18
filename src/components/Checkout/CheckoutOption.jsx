import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CheckoutOption = ({
  setSelectedAddress,
  setSelectedPayment,
  isCodAvailable,
}) => {
  // **************************** Get Address API Code Start ***********************************
  const UserId = localStorage.getItem("user_id");

  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      const requestBody = {
        userId: UserId,
      };
      try {
        const response = await fetchData(
          API_URLS.getDefaultAddress,
          requestBody
        );
        if (response.responseCode === 1) {
          const data = JSON.parse(response.responseData);
          setAddress(data);
        } else {
          toast.error(`Error: ${response.responseMessage}`);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };
    fetchAddress();
  }, [address, UserId]);

  // **************************** Get Address API Code Start ***********************************

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <>
      <div className="left-sidebar-checkout">
        <div className="checkout-detail-box">
          <ul>
            <li>
              <div className="checkout-icon">
                <lord-icon
                  target=".nav-item"
                  src="https://cdn.lordicon.com/ggihhudh.json"
                  trigger="loop-on-hover"
                  colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a"
                  className="lord-icon"
                ></lord-icon>
              </div>
              <div className="checkout-box">
                <div className="checkout-title">
                  <h4>Delivery Address</h4>
                </div>
                {address.length === 0 ? (
                  <p>
                    No Address Found! <br /> Please Add New Address or set
                    Default Address.{" "}
                    <Link to="/user-dashboard">Click Here.</Link>
                  </p>
                ) : (
                  address &&
                  address.map((address) => (
                    <div className="checkout-detail">
                      <div className="row g-4">
                        <div className="col-xxl-6 col-lg-12 col-md-6">
                          <div className="delivery-address-box">
                            <div>
                              <div className="custom-form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="address"
                                  id="address"
                                  onChange={handleAddressChange}
                                  value={address.id}
                                />
                              </div>

                              <ul className="delivery-address-detail">
                                <li>
                                  <h4 className="fw-500">{address.name}</h4>
                                </li>
                                <li>
                                  <p className="text-content">
                                    <span className="text-title">
                                      Address:{" "}
                                    </span>
                                    {address.house} {address.area},{" "}
                                    {address.landmark}, {address.city},{" "}
                                    {address.state}, {address.country}
                                  </p>
                                </li>
                                <li>
                                  <h6 className="text-content">
                                    <span className="text-title">
                                      Pin Code:
                                    </span>{" "}
                                    {address.pincode}
                                  </h6>
                                </li>
                                <li>
                                  <h6 className="text-content mb-0">
                                    <span className="text-title">Phone :</span>{" "}
                                    {address.phone}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </li>

            <li>
              <div className="checkout-icon">
                <lord-icon
                  target=".nav-item"
                  src="https://cdn.lordicon.com/qmcsqnle.json"
                  trigger="loop-on-hover"
                  colors="primary:#0baf9a,secondary:#0baf9a"
                  className="lord-icon"
                ></lord-icon>
              </div>
              <div className="checkout-box">
                <div className="checkout-title">
                  <h4>Payment Option</h4>
                </div>

                <div className="checkout-detail">
                  <div className="row g-4">
                    {!isCodAvailable && (
                      <div className="col-lg-6">
                        <div className="delivery-address-box">
                          <div>
                            <div className="custom-form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="payment"
                                id="cash"
                                onChange={handlePaymentChange}
                                value="cash"
                              />
                            </div>

                            <ul className="delivery-address-detail">
                              <li>
                                <h4 className="fw-500">Cash On Delivery</h4>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="col-lg-6">
                      <div className="delivery-address-box">
                        <div>
                          <div className="custom-form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="payment"
                              id="online"
                              onChange={handlePaymentChange}
                              value="online"
                            />
                          </div>
                          <ul className="delivery-address-detail">
                            <li>
                              <h4 className="fw-500">Pay Online</h4>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-lg-6">
                                            <div className="delivery-address-box">
                                                <div>
                                                    <div className="custom-form-check">
                                                        <input class="form-check-input" type="radio" name="payment" id="wallet" onChange={handlePaymentChange} value="wallet" />
                                                    </div>
                                                    <ul className="delivery-address-detail">
                                                        <li>
                                                            <h4 className="fw-500">My Wallet</h4>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> */}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CheckoutOption;
