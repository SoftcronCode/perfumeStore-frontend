import React, { useState, useEffect } from 'react'
import { fetchData } from '../../api/apiService';
import { API_URLS } from '../../api/apiUrls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PropagateLoader } from 'react-spinners';

const NavTabs = ({ productId }) => {

  //*********** Product API code start ************
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {

      try {
        setLoading(true);
        const requestBody = {
          productId: productId,
        };

        const response = await fetchData(API_URLS.getProductById, requestBody);
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const ProductDetailsData = JSON.parse(responseData);
          setProductDetails(ProductDetailsData);
        } else {
          toast.error(`Error: ${response.responseMessage}`, {
            toastId: "unique-error-toast",
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          toastId: "unique-error-toast",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);
  //************** Product API code end ****************

  //************Review API code start *************
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {

      try {
        setLoading(true);
        const requestBodys = {
          productId: productId,
        };

        const response = await fetchData(API_URLS.getProductReview, requestBodys);
        if (response.responseCode === 1) {
          const responseData = response.responseData;
          const ProductReview = JSON.parse(responseData);
          setReviews(ProductReview);
        } else {
          toast.error(`Error: ${response.responseMessage}`, {
            toastId: "unique-error-toast",
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          toastId: "unique-error-toast",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  //************** / API code end *****************

  //********* Loading code Start *************
  const [loading, setLoading] = useState(true);
  if (loading) return <PropagateLoader color="#36d7b7" />;
  if (!productDetails) {
    return <p>No product details available.</p>;
  }
  //********* Loading code End *************

  return (
    <>
      {/* Nav Tab Section Start */}
      <section>
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="product-section-box m-0">
                <ul className="nav nav-tabs custom-nav" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="description-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#description"
                      type="button"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#info"
                      type="button"
                      role="tab"
                      aria-controls="info"
                      aria-selected="false"
                    >
                      Additional info
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="review-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#review"
                      type="button"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                    >
                      Review
                    </button>
                  </li>
                </ul>
                <div className="tab-content custom-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <div className="product-description">
                      <div className="nav-desh">
                        <p>
                          {productDetails.length > 0 && productDetails[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="info"
                    role="tabpanel"
                    aria-labelledby="info-tab"
                  >
                    <div className="table-responsive">
                      <table className="table info-table">
                        <tbody>
                          <tr>
                            <td>Dispatch Time</td>
                            <td>{productDetails.length > 0 && productDetails[0].dispatch_time} days</td>
                          </tr>
                          <tr>
                            <td>Delivery Time</td>
                            <td>{productDetails.length > 0 && productDetails[0].delivery_time} days</td>
                          </tr>
                          <tr>
                            <td>Packed By</td>
                            <td>{productDetails.length > 0 && productDetails[0].packed_by}</td>
                          </tr>
                          <tr>
                            <td>Manufactured By</td>
                            <td>{productDetails.length > 0 && productDetails[0].manufactured_by}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="care"
                    role="tabpanel"
                    aria-labelledby="care-tab"
                  >
                  </div>
                  <div
                    className="tab-pane fade"
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                  >
                    <div className="review-box">
                      <div className="row g-4">
                        <div className="col-xl-8 col-lg-8">
                          <div className="review-title">
                            <h4 className="fw-500">
                              Customer questions &amp; answers
                            </h4>
                          </div>
                          <div className="review-people">
                            <ul className="review-list">
                              {reviews && reviews.map((review) => (
                                <li>
                                  <div className="people-box">
                                    <div>
                                      <div className="people-image">
                                        <img
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3sHyNuCJuROMVQtkdupgwC37sabznR2P_c61j_jDRQ&s"
                                          className="img-fluid blur-up lazyload"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    <div className="people-comment">
                                      <a className="name" href="javascript:void(0)">
                                        {review.name}
                                      </a>
                                      <div className="date-time">
                                        <h6 className="text-content">
                                          {review.created_at}
                                        </h6>
                                        <div className="product-rating">
                                          <ul className="rating">
                                            <li>
                                              <i
                                                data-feather="star"
                                                className="fill"
                                              />
                                            </li>
                                            <li>
                                              <i
                                                data-feather="star"
                                                className="fill"
                                              />
                                            </li>
                                            <li>
                                              <i
                                                data-feather="star"
                                                className="fill"
                                              />
                                            </li>
                                            <li>
                                              <i data-feather="star" />
                                            </li>
                                            <li>
                                              <i data-feather="star" />
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="reply">
                                        <p>
                                          {review.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4">
                          <div className="review-title">
                            <h4 className="fw-500">Add a review</h4>
                          </div>
                          <div className="row g-4">
                            <div className="col-12">
                              <div className="form-floating theme-form-floating">
                                <textarea
                                  className="form-control"
                                  placeholder="Leave a comment here"
                                  id="floatingTextarea2"
                                  style={{ height: 150 }}
                                  defaultValue={""}
                                />
                                <label htmlFor="floatingTextarea2">
                                  Write Your Comment
                                </label>
                              </div><br />
                              <button onclick="location.href = 'cart.html';" className="btn btn-md cart-button text-light w-100">
                                Add Review
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Nav Tab Section End */}
    </>
  )
}

export default NavTabs