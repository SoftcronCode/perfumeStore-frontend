import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


const AddAddressModal = ({ selectedRowData, setSelectedRowData }) => {

  const userId = localStorage.getItem('user_id');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);




  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);
  


  const handleAddressSubmit = async (data) => {
    console.log(data);
  };

  ///////////////// Clear Form Code Start ////////////////////////////
  const handleCloseModal = () => {

  };

  //Add Address API Code End----------------------

  return (
    <>
      {/* <!-- Add address modal box start --> */}
      <div className="modal fade theme-modal" id="add-address" tabIndex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add a new address</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form id="formAddress" onSubmit={handleSubmit(handleAddressSubmit)}>
                <div className="row g-4">

                  <div className="col-xxl-12">
                    <div className="form-floating theme-form-floating">

                      <input type="text" className="form-control" id="fullname" name="fullname" {...register("fullname", {
                        required: "Full Name is Required"
                      })} />
                      <label htmlFor="name">Full Name</label>
                      {errors.fullname && <p className="errorMsg">{errors.fullname.message}</p>}
                    </div>
                  </div>

                  <div className="col-xxl-6">
                    <div className="form-floating theme-form-floating">
                      <input className="form-control" type="tel" name="mobileNumber" id="mobileNumber" maxLength="10" {...register("mobileNumber", {
                        required: "Mobile Number is Required"
                      })} />
                      <label htmlFor="mobileNumber">Phone Number</label>
                      {errors?.mobileNumber && <p className="errorMsg">{errors.mobileNumber.message}</p>}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-floating theme-form-floating">
                      <input type="text" className="form-control" id="houseNo" name="houseNo" {...register("houseNo", {
                        required: "House Number is Required"
                      })} />
                      <label htmlFor="houseNo">House Number</label>
                      {errors?.houseNo && <p className="errorMsg">{errors.houseNo.message}</p>}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-floating theme-form-floating">
                      <input type="text" className="form-control" id="area" name="area" {...register("area", {
                        required: "House Number is Required"
                      })} />
                      <label htmlFor="area">Area</label>
                      {errors?.area && <p className="errorMsg">{errors.area.message}</p>}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-floating theme-form-floating">
                      <input type="text" className="form-control" id="landmark" name="landmark" {...register("landmark", {
                        required: "LankMark is Required"
                      })} />
                      <label htmlFor="landmark">Landmark</label>
                      {errors?.landmark && <p className="errorMsg">{errors.landmark.message}</p>}
                    </div>
                  </div>



                  <div className="col-6">
                    <select onChange={(e) => {
                      const country = countriesList[e.target.value];
                      setCountryid(country.id);
                      GetState(country.id).then((result) => {
                        setStateList(result);
                      });
                    }}
                      value={countryid}
                    >
                      {countriesList.map((item, index) => (
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6">
                    <select onChange={(e) => {
                      const state = stateList[e.target.value];
                      setStateid(state.id);
                      GetCity(countryid, state.id).then((result) => {
                        setCityList(result);
                      });
                    }}
                      value={stateid}
                    >
                      {stateList.map((item, index) => (
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6">
                    <select onChange={(e) => {
                      const city = cityList[e.target.value];
                      setCityid(city.id);
                    }}
                      value={cityid}
                    >
                      {cityList.map((item, index) => (
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-xxl-6">
                    <div className="form-floating theme-form-floating">
                      <input type="text" className="form-control" id="zipCode" name="zipCode" {...register("zipCode", {
                        required: "ZipCode is Required"
                      })} />
                      <label htmlFor="zipCode">Pin Code</label>
                      {errors?.zipCode && <p className="errorMsg">{errors.zipCode.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-md" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn theme-bg-color btn-md text-white">
                    Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Add address modal box end --> */}
    </>
  )
}

export default AddAddressModal