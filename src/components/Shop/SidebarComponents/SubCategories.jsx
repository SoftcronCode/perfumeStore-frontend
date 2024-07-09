import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const SubCategories = ({ selectedSubCategories, onSubCategoriesSelect }) => {
  const SubCategories = () => {
    //******************** API Code Start *****************
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            const requestBody = {
                categoryId : 2,
              };
          try {
            const response = await fetchData(API_URLS.getSubCategories, requestBody);
            if (response.responseCode === 1) {
              const responseData = response.responseData;
              const subCategoriesData = JSON.parse(responseData);
              setSubcategories(subCategoriesData);
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
    
        fetchSubCategories();
      }, []);
      //******************** */ API Code Start *****************

      // const handleSubCategoriesSelect = (subCategory) => {
      //   onSubCategoriesSelect(subCategory);
      // };

  return (
    <>
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                aria-expanded="false" aria-controls="collapseTwo" >
                    <span>Subcategories</span>
                </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                <div className="accordion-body">
                    <ul className="category-list custom-padding">
                    {subcategories && subcategories.map((subCategory) => (
                        <li key={subCategory.id}>
                            <div className="form-check ps-0 m-0 category-list-box">
                                {/* <input className="checkbox_animated" type="checkbox" id={`subCategory-${subCategory.id}`}
                                onChange={() => handleSubCategoriesSelect(subCategory.name)}
                                checked={selectedSubCategories.includes(subCategory.name)}/> */}
                                <input className="checkbox_animated" type="checkbox"/>
                                <label className="form-check-label">
                                    <span className="name">{subCategory.name}</span>
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

export default SubCategories