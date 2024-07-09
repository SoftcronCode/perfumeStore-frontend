import React, { useState, useEffect } from 'react'
import { fetchData } from '../../api/apiService';
import { API_URLS, PRODUCT_IMG_BASE_URL } from '../../api/apiUrls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { AddToCart } from '../../api/productActions';

const QuickViewModel = ({ selectedProductId }) => {

  //*********** API code start ************ 
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {

      try {
        const requestBody = {
          productId: selectedProductId,
        };

        const response = await fetchData(API_URLS.getProductById, requestBody);
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const productDetailsData = JSON.parse(responseData);
          setProductDetails(productDetailsData);
        } else {
          toast.error(`Error: ${response.responseMessage}`);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };
    if (selectedProductId) {
      fetchProductDetails();
    }
  }, [selectedProductId]);

  //************** / API code end *****************

  //********** Percentage code Start *************

  const mrp = productDetails[0]?.mrp;
  const price = productDetails[0]?.price;
  const percentageOff = mrp && price ? ((mrp - price) / mrp) * 100 : 0;

  //********** Percentage code End *************

  //********* COD code Start *************
  const isCODAvailable = productDetails[0]?.cod === 1;
  //********* COD code End *************

  return (
    <>
      {/* Quick View Modal Box Start */}
      <div className="modal fade theme-modal view-modal" id="view" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header p-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <div className="row g-sm-4 g-2">
                <div className="col-lg-6">
                  <div className="slider-image">
                    <img
                      src={`${PRODUCT_IMG_BASE_URL}${productDetails.length > 0 && productDetails[0].image_name}`}
                      className="img-fluid blur-up lazyload" alt="" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-sidebar-modal">
                    <h4 className="title-name">
                      {productDetails.length > 0 && productDetails[0].product_name}
                    </h4>
                    <h4 className="price">
                      ₹{productDetails.length > 0 && productDetails[0].price} <del className="text-content fs-6">₹{productDetails.length > 0 && productDetails[0].mrp}</del>{" "}
                      <span className="offer theme-color">({percentageOff.toFixed(2)}% off)</span>
                    </h4>
                    <div className="product-detail">
                      <h4>Product Details :</h4>
                      <p>
                        {productDetails.length > 0 && productDetails[0].short_description}
                      </p>
                    </div>
                    <ul className="brand-list">
                      <li>
                        <div className="brand-box">
                          <h5>Product Weight :</h5>
                          <h6>{productDetails.length > 0 && productDetails[0].product_weight}</h6>
                        </div>
                      </li>
                      <li>
                        <div className="brand-box">
                          <h5>Shipping Weight :</h5>
                          <h6>{productDetails.length > 0 && productDetails[0].shipping_weight}</h6>
                        </div>
                      </li>
                      <li>
                        <div className="brand-box">
                          <h5>COD :</h5>
                          <h6>{productDetails.length > 0 && isCODAvailable ? 'Available' : 'Not Available'}</h6>
                        </div>
                      </li>
                      <li>
                        <div className="brand-box">
                          <h5>Packed By :</h5>
                          <h6>{productDetails.length > 0 && productDetails[0].packed_by}</h6>
                        </div>
                      </li>
                    </ul>
                    <div className="modal-button">
                      <button  className="btn btn-md add-cart-button icon"  onClick={() => AddToCart(productDetails[0].id, productDetails[0].variation_id)}> Add To Cart </button>
                      <Link href="/product-detail" className="btn theme-bg-color view-button icon text-white fw-bold btn-md">
                        View More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick View Modal Box End */}
    </>
  )
}

export default QuickViewModel