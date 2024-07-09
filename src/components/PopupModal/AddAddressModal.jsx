import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { AddressFormSubmit } from "../../api/productActions";


const AddAddressModal = ({ selectedRowData, setSelectedRowData, isAddressUpdate, setIsAddressUpdate }) => {

    const userId = localStorage.getItem('user_id');
    const [mode, setMode] = useState("Add");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [country_id, setCountry_id] = useState("");
    const [state_id, setState_id] = useState("");
    const [city_id, setCity_id] = useState("");


    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result);
        });
    }, []);

    useEffect(() => {
        if (selectedRowData) {
            setMode("Edit");
            setValue("hdnField_productId", selectedRowData.id);
            setValue("fullname", selectedRowData.name);
            setValue("mobileNumber", selectedRowData.phone);
            setValue("houseNo", selectedRowData.house);
            setValue("area", selectedRowData.area);
            setValue("landmark", selectedRowData.landmark);
            setValue("zipCode", selectedRowData.pincode);

            const country_id = selectedRowData.country_id;
            setCountry_id(country_id);
            setCountryName(selectedRowData.country)
            const state_id = selectedRowData.state_id;
            setState_id(state_id);
            setStateName(selectedRowData.state)
            const city_id = selectedRowData.city_id;
            setCity_id(city_id);
            setCityName(selectedRowData.city);
            GetState(country_id).then((result) => {
                setStateList(result);
            });

            GetCity(country_id, state_id).then((result) => {
                setCityList(result);
            });
        }
        else {
            handleReset();
        }
    }, [selectedRowData, setValue]);


    const handleCountryChange = async (event) => {
        const selectedCountry = countriesList[event.target.value];
        const selectedCountryID = selectedCountry.id;
        const selectedCountryName = selectedCountry.name;
        setCountry_id(selectedCountryID);
        setCountryName(selectedCountryName);
        setStateList([]);
        setCityList([]);
        GetState(selectedCountryID).then((result) => {
            setStateList(result);
        });
    };

    const handleStateChange = async (event) => {
        const selectedState = stateList.find(state => state.id === parseInt(event.target.value));
        const selectedStateID = selectedState.id;
        const selectedStateName = selectedState.name;
        setState_id(selectedStateID);
        setStateName(selectedStateName);
        setCityList([]);
        GetCity(country_id, selectedStateID).then((result) => {
            setCityList(result);
        });
    };

    const handleCityChange = async (event) => {
        const selectedCity = cityList.find(city => city.id === parseInt(event.target.value));
        const selectedCityID = selectedCity.id;
        const selectedCityName = selectedCity.name;
        setCity_id(selectedCityID);
        setCityName(selectedCityName);
    };

    const handleAddressSubmit = async (data) => {
        data.user_id = userId;
        data.country_id = country_id;
        data.state_id = state_id;
        data.city_id = city_id;
        data.country_name = countryName;
        data.state_name = stateName;
        data.city_name = cityName;
        console.log(data);
        await AddressFormSubmit(data, mode);
        handleReset();
        setSelectedRowData(null);
        setIsAddressUpdate(!isAddressUpdate);
    };


    const handleReset = () => {
        setMode("Add");
        setValue("fullname", "");
        setValue("mobileNumber", "");
        setValue("houseNo", "");
        setValue("area", "");
        setValue("landmark", "");
        setValue("zipCode", "");
        setCountry_id("");
        setState_id("");
        setCity_id("");
        setStateList([]);
        setCityList([]);
        document.getElementById('add-address').classList.remove('show');
        const modalBackdrop = document.querySelector('.modal-backdrop.fade.show');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
    };



    return (
        <>
            {/* <!-- Add address modal box start --> */}
            <div className="modal fade theme-modal" id="add-address" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{mode === "Add" ? "Add New" : "Edit"} Address</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReset}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="formAddress" onSubmit={handleSubmit(handleAddressSubmit)}>
                                <div className="row g-4">

                                    { /* Hidden Field for Product ID */}
                                    <input type="hidden" id="addressId" {...register("hdnField_addressId")} />

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
                                        <div className="form-floating theme-form-floating">
                                            <select className="form-select" id="floatingCountry" onChange={handleCountryChange} value={country_id}>
                                                <option value={true}>Select Country</option>
                                                {countriesList.map((item, index) => (
                                                    <option key={index} value={item.id}> {item.name} </option>
                                                ))}
                                            </select>
                                            <label htmlFor="floatingCountry">Country</label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-floating theme-form-floating">
                                            <select className="form-select" id="floatingState" onChange={handleStateChange} value={state_id} disabled={!stateList.length}>
                                                <option value={true}>Select State</option>
                                                {stateList.map((item, index) => (
                                                    <option key={index} value={item.id}> {item.name} </option>
                                                ))}
                                            </select>
                                            <label htmlFor="floatingState">State</label>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-floating theme-form-floating">
                                            <select className="form-select" id="floatingCity" onChange={handleCityChange} value={city_id} disabled={!cityList.length}>
                                                <option value={true}>Select City</option>
                                                {cityList.map((item, index) => (
                                                    <option key={index} value={item.id}> {item.name} </option>
                                                ))}
                                            </select>
                                            <label htmlFor="floatingCity">City</label>
                                        </div>
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
                                    <button type="button" className="btn btn-secondary btn-md" data-bs-dismiss="modal" onClick={handleReset}>Close</button>
                                    <button type="submit" className="btn theme-bg-color btn-md text-white">
                                        {mode === "Add" ? "Add" : "Update"} Address</button>
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