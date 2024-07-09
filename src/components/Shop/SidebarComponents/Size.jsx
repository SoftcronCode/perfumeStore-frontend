import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Size = () => {

        //************ */ API Code Start ***************
        const [sizes, setSizes] = useState([]);
      
        useEffect(() => {
          const fetchSizes = async () => {
            try {
              const response = await fetchData(API_URLS.getAllSizes, {});
              if (response.responseCode === 1) {
                const responseData = response.responseData;
                const sizesData = JSON.parse(responseData);
                setSizes(sizesData);
              } else {
                // Show error toast
                toast.error(`Error: ${response.responseMessage}`, {
                  toastId: "unique-error-toast",
                });
              }
            } catch (error) {
              // Handle error as needed
              toast.error(`Error: ${error.message}`, {
                toastId: "unique-error-toast",
              });
            }
          };
      
          fetchSizes();
        }, []);
        //*************** API Code End *******************

  return (
    <>
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive"
                aria-expanded="false" aria-controls="collapseFive">
                    <span>Size</span>
                </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingFive" >
                <div className="accordion-body">
                    <ul className="category-list custom-padding custom-height">
                    {sizes.map((size) => (
                        <li key={size.id}>
                            <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="flexCheckDefault5"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault5">
                                        <span className="name">{size.size}</span>
                                    </label>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Size