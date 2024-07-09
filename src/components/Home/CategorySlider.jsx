import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import {CAT_IMAGE_BASE_URL} from "../../api/apiUrls"


const CategorySlider = () => {
        //Slider Js Start
        const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 8,
          slidesToScroll: 1,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1745,
              settings: {
                slidesToShow: 7,
              },
            },
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 6,
              },
            },
            {
              breakpoint: 1124,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 692,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 482,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        };
        //Slider Js End

        // API Code Start
        const [categories, setCategories] = useState([]);
      
        useEffect(() => {
          const fetchCategories = async () => {
            try {
              const response = await fetchData(API_URLS.getCategories, {});
              if (response.responseCode === 1) {
                const responseData = response.responseData;
                const categoriesData = JSON.parse(responseData);
                setCategories(categoriesData);
              } else {
                // Show error toast
                toast.error(`Error: ${response.responseMessage}`);
              }
            } catch (error) {
              // Handle error as needed
              toast.error(`Error: ${error.message}`);
            }
          };
      
          fetchCategories();
        }, []);
        //API Code End

  return (
        <>
  <section className="category-section-3">
    <div className="container-fluid-lg">
      <div className="title">
        <h2>Shop By Categories</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="category-slider-1 arrow-slider wow fadeInUp">
          <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.id}>
              <div className="category-box-list">
                <a href={category.slug}>
                  <img
                   src={`${CAT_IMAGE_BASE_URL}${category.cat_image}`}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                  <button
                    onclick="location.href = {category.slug};" className="btn shop-button">
                    Shop Now <i className="fas fa-angle-right" />
                  </button>
                </a>
              </div>
              <div className="text-center mt-3">
                <h4>{category.name}</h4>
              </div>
            </div>
          ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </section>
</>
  )
}

export default CategorySlider