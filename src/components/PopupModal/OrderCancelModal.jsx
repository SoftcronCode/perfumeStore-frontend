import React from 'react';
import { toast } from "react-toastify";
import { fetchData } from '../../api/apiService';
import { API_URLS } from "../../api/apiUrls";

const OrderCancelModal = (order_id) => {

    //*********************************** To Hide Or show the Reason Textbox Based on radio button click ****************************************************** */
    const handleRadioChange = (e) => {
        const otherReasonInput = document.getElementById("reason-textbox");
        if (e.target.value === "Other") {
            otherReasonInput.style.display = "block";
        } else {
            otherReasonInput.style.display = "none";
        }
    };

    //************************************ To Hide Or show the Reason Textbox Based on radio button click ******************************************************* */

    //**************************** Method run on Save Button Click ****************************************** */
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const selectedReason = document.querySelector('input[name="reason"]:checked');

        // // Check if a reason is selected
        if (!selectedReason) {
            toast.error("Please select a reason for cancellation", {
                toastId: "unique-error-toast",
            });
            return;
        }

        const reason = selectedReason.value === "Other" ? document.getElementById("reason").value : selectedReason.value;

        // Check if a reason is Empty or null.
        if (!reason) {
            toast.error("Please write a reason for cancellation", {
                toastId: "unique-error-toast",
            });
            return;
        }

        const requestBody = {
            reason: reason,
            orderId: order_id.orderId
        };

        try {
            const response = await fetchData(API_URLS.cancelOrder, requestBody);
            if (response.responseCode === 1) {
                toast.success(response.responseMessage, {
                    toastId: "unique-error-toast",
                });
                // Clear the textbox and remove the selected radio button
                document.getElementById("reason-textbox").value = "";
                document.querySelector('input[name="reason"]:checked').checked = false;
                const otherReasonInput = document.getElementById("reason-textbox");
                otherReasonInput.style.display = "none";
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
    //***************************** Save Button Click Method End ************************************************************** */

    // *************** Clear the textbox and remove the selected radio button when close button is clicked ************************
    const handleClose = () => {
        const otherReasonInput = document.getElementById("reason-textbox");
        otherReasonInput.style.display = "none";
        document.getElementById("reason-textbox").value = "";
        const selectedReason = document.querySelector('input[name="reason"]:checked');
        if (selectedReason) {
            selectedReason.checked = false;
        }
    };
    // ****************************************************************************************************************************


    return (
        <div className="modal fade theme-modal" id="cancelReason" tabIndex="-1" aria-labelledby="reasonModal" data-bs-backdrop="static" aria-hidden="true" >
            <div className="modal-dialog modal-md modal-dialog-centered modal-fullscreen-sm-down">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="reasonModal">Order Cancel Reason</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-4">
                            <div className="col-xxl-12">
                                <ul className="category-list custom-padding">
                                    <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                            <input className="checkbox_animated" type="radio" name="reason" id="orderMistake" value={'Order placed by mistake'} onChange={handleRadioChange} />
                                            <label className="form-check-label" htmlFor="orderMistake">
                                                <span className="name">Order placed by mistake</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                            <input className="checkbox_animated" type="radio" name="reason" id="cheaperPrice" value={'Found at cheaper price at some other place'} onChange={handleRadioChange} />
                                            <label className="form-check-label" htmlFor="cheaperPrice">
                                                <span className="name">Found at cheaper price at some other place</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                            <input className="checkbox_animated" type="radio" name="reason" id="buyFuture" value={'Will buy in future'} onChange={handleRadioChange} />
                                            <label className="form-check-label" htmlFor="buyFuture">
                                                <span className="name">Will buy in future</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                            <input className="checkbox_animated" type="radio" name="reason" id="deliveryTime" value={'Delivery Time is longer than expected'} onChange={handleRadioChange} />
                                            <label className="form-check-label" htmlFor="deliveryTime">
                                                <span className="name">Delivery Time is longer than expected</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check ps-0 m-0 category-list-box">
                                            <input className="checkbox_animated" type="radio" name="reason" id="other" value={'Other'} onChange={handleRadioChange} />
                                            <label className="form-check-label" htmlFor="other">
                                                <span className="name">Other</span>
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                                <div className="form-floating mb-4 theme-form-floating mt-4" id='reason-textbox' style={{ display: 'none' }}>
                                    <textarea className="form-control" placeholder="Write Reason" id="reason"></textarea>
                                    <label htmlFor="reason">Enter Reason</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleSaveChanges} data-bs-dismiss="modal" className="btn theme-bg-color btn-md fw-bold text-light">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCancelModal