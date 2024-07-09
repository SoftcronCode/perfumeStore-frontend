// Colors component
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/apiService";
import { API_URLS } from "../../../api/apiUrls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Colors = ({ selectedColors, onColorSelect }) => {
  const Colors = () => {

   //********************  API Code Start *****************
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetchData(API_URLS.getAllColors, {});
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const colorsData = JSON.parse(responseData);
          setColors(colorsData);
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

    fetchColors();
  }, []);
  //********************  API Code End *****************

  //********************  Color Filter Code Start *****************
  // const handleColorSelect = (color) => {
  //   onColorSelect(color);
  // };
  //********************  Color Filter Code End *****************

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            <span>Color</span>
          </button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingFour"
        >
          <div className="accordion-body">
            <ul className="category-list custom-padding">
              {colors.map((color) => (
                <li key={color.id}>
                  <div className="form-check ps-0 m-0 category-list-box">
                    {/* <input
                      className="checkbox_animated"
                      type="checkbox"
                      id={`color-${color.id}`}
                      onChange={() => handleColorSelect(color.color)}
                      checked={selectedColors.includes(color.color)}
                    /> */}
                     <input className="checkbox_animated" type="checkbox" />
                    <label
                      className="form-check-label"
                      htmlFor={`color-${color.id}`}
                    >
                      <span className="name">{color.color}</span>
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

export default Colors;
