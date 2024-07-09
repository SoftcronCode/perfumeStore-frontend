import React, { useEffect, useState } from "react";
import { fetchData } from '../../../api/apiService';
import { API_URLS } from '../../../api/apiUrls';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteAddress, SetDefaultAddress } from '../../../api/productActions';
import AddAddressModal from "../../PopupModal/AddAddressModal";

const Address = () => {

  // **************************** Get Address API Code Start ***********************************
  const UserId = localStorage.getItem('user_id');

  const [address, setAddress] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isAddressUpdate, setIsAddressUpdate] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      const requestBody = {
        userId: UserId,
      };

      try {
        const response = await fetchData(API_URLS.getAddress, requestBody);
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
  }, [address, UserId, isAddressUpdate]);

  // **************************** Get Address API Code Start ***********************************


  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  return (
    <>
      <div className="dashboard-address">
        <div className="title title-flex">
          <div>
            <h2>My Address Book</h2>
            <span className="title-leaf">
              {/* <svg classname="icon-width bg-gray">
                            <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf" />
                        </svg> */}
            </span>
          </div>

          <button className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
            data-bs-toggle="modal" data-bs-target="#add-address"><i data-feather="plus"
              className="me-2"></i> Add New Address</button>
        </div>

        {address.length === 0 ? (
          <p>No Address Found! Please Add New Address.</p>
        ) : (
          <div className="row g-sm-4 g-3">
            {address.map((addresses) => (
              <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-6" key={addresses.id}>
                <div className="address-box">
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="jack" id={`address_${addresses.id}`}
                        checked={addresses.active_status === 1 ? true : false}
                        onClick={() => SetDefaultAddress(addresses.id)} readOnly />
                    </div>

                    <div className="table-responsive address-table">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td colSpan="2">{addresses.name}</td>
                          </tr>

                          <tr>
                            <td>Address :</td>
                            <td>
                              <p>{addresses.house} {addresses.area}, {addresses.landmark}, {addresses.city}, {addresses.state}, {addresses.country}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td>Pin Code :</td>
                            <td>{addresses.pincode}</td>
                          </tr>

                          <tr>
                            <td>Phone :</td>
                            <td>+91 {addresses.phone}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="button-group">
                    <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#add-address" onClick={() => handleEditClick(addresses)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      Edit</button>
                    <button className="btn btn-sm add-button w-100" onClick={() => DeleteAddress(addresses.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddAddressModal selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} isAddressUpdate={isAddressUpdate} setIsAddressUpdate={setIsAddressUpdate}/>
    </>
  )
}

export default Address