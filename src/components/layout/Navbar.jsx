import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchData } from "../../api/apiService";
import { API_URLS } from "../../api/apiUrls";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  // Bind All Categories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetchData(API_URLS.getCategories, {});
  //       if (response.responseCode === 1) {
  //         const responseData = response.responseData;
  //         const categoriesData = JSON.parse(responseData);
  //         setCategories(categoriesData);
  //       } else {
  //         // Show error toast
  //         toast.error(`Error: ${response.responseMessage}`, {
  //           toastId: "unique-error-toast",
  //         });
  //       }
  //     } catch (error) {
  //       // Handle error as needed
  //       toast.error(`Error: ${error.message}`, {
  //         toastId: "unique-error-toast",
  //       });
  //     }
  //   };

  //   fetchCategories();
  // }, []);



  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        // Fetch Categories
        const categoriesResponse = await fetchData(API_URLS.getCategories, {});
        if (categoriesResponse.responseCode === 1) {
          const categoriesData = JSON.parse(categoriesResponse.responseData);
          setCategories(categoriesData);

          // Fetch SubCategories For Each Category
          const subcategoriesPromises = categoriesData.map(async (category) => {
            const subCategoriesResponse = await fetchData(
              API_URLS.getSubCategories,
              { categoryId: category.id }
            );
            if (subCategoriesResponse.responseCode === 1) {
              const SubCategoriesData = JSON.parse(
                subCategoriesResponse.responseData
              );
              return {
                categoryId: category.id,
                subcategories: SubCategoriesData,
              };
            } else {
              toast.error(`Error: ${subCategoriesResponse.responseMessage}`, {
                toastId: "unique-error-toast",
              });
              return { categoryId: category.id, subcategories: [] };
            }
          });

          // Resolve all subcategories promises
          const resolvedSubcategories = await Promise.all(
            subcategoriesPromises
          );
          setSubcategories(resolvedSubcategories);
        } else {
          toast.error(`Error: ${categoriesResponse.responseMessage}`, {
            toastId: "unique-error-toast",
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          toastId: "unique-error-toast",
        });
      }
    };
    fetchCategoriesAndSubCategories();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover535010
        theme="light"
        transition={Bounce}
      />

      <div className="container-fluid-lg">
        <div className="row">
          <div className="col-12">
            <div className="header-nav">
              <div className="header-nav-left">
                <button className="dropdown-category">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-align-left"
                  >
                    <line x1={17} y1={10} x2={3} y2={10} />
                    <line x1={21} y1={6} x2={3} y2={6} />
                    <line x1={21} y1={14} x2={3} y2={14} />
                    <line x1={17} y1={18} x2={3} y2={18} />
                  </svg>
                  <span>All Categories</span>
                </button>
                <div className="category-dropdown">
                  <div className="category-title">
                    <h5>Categories</h5>
                    <button
                      type="button"
                      className="btn p-0 close-button text-content"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <ul className="category-list">
                    {categories.map((category) => (
                      <li className="onhover-category-list" key={category.id}>
                        <a href="!#" className="category-name">
                          <h6>{category.name}</h6>
                          <i className="fa-solid fa-angle-right" />
                        </a>
                        {subcategories
                          .filter((sub) => sub.categoryId === category.id)
                          .map((subcategoryGroup) => (
                            subcategoryGroup.subcategories && (
                              <div className="onhover-category-box" key={subcategoryGroup.categoryId}>
                                <div className="list-1">
                                  <div className="category-title-box">
                                    <h5>{category.name}</h5>
                                  </div>
                                  <ul>
                                    {subcategoryGroup.subcategories.map((subcategory) => (
                                      <li key={subcategory.id}>
                                        <a href={subcategory.slug}>{subcategory.name}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )
                          ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="header-nav-middle">
                <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                  <div
                    className="offcanvas offcanvas-collapse order-xl-2"
                    id="primaryMenu"
                  >
                    <div className="offcanvas-header navbar-shadow">
                      <h5>Menu</h5>
                      <button
                        className="btn-close lead"
                        type="button"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link className="nav-link" to="/"> Home</Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/shop" > Shop </Link>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="!#"> Blog </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle nav-link-dropdown" href="!#" data-bs-toggle="dropdown"> Seller</a>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="!#"
                              >
                                Become a Seller
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="!#"
                              >
                                Seller Dashboard
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="!#"
                              >
                                Seller Detail
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-nav-right">
                <button
                  className="btn deal-button"
                  data-bs-toggle="modal"
                  data-bs-target="#deal-box"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-zap"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>Deal Today</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
