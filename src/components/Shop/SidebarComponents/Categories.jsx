import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Categories = ({ selectedCategories = [], onCategorySelect }) => {
  const Categories = () => {
  
  const [categories, setCategories] = useState([]);

  //************ API Code Start ***************
  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const response = await fetchData(API_URLS.getCategories, {});
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const categoriesData = JSON.parse(responseData);
          setCategories(categoriesData);
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

    fetchCategories();
  }, []);
  //************ API Code End ***************

  //************ Add category to Filter Code Start ***************
  // const handleCategorySelect = (category) => {
  //   const updatedSelectedCategories = selectedCategories.includes(category)
  //     ? selectedCategories.filter(
  //         (selectedCategory) => selectedCategory !== category
  //       )
  //     : [...selectedCategories, category];

  //   onCategorySelect(updatedSelectedCategories);
  // };

  // const memoizedSelectedCategories = useMemo(
  //   () => new Set(selectedCategories),
  //   [selectedCategories]
  // );
  //************ Add category to Filter Code End ***************

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <span>Categories</span>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <ul className="category-list custom-padding custom-height">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="form-check ps-0 m-0 category-list-box">
                    {/* <input
                      className="checkbox_animated"
                      type="checkbox"
                      id={category.name}
                      checked={memoizedSelectedCategories.has(category.name)}
                      onChange={() => handleCategorySelect(category.name)}
                    /> */}
                     <input className="checkbox_animated" type="checkbox" />
                    <label
                      className="form-check-label" htmlFor={category.name} >
                      <span className="name">{category.name}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
