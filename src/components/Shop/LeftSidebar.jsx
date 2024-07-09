import React, { useState } from 'react';
import Categories from './SidebarComponents/Categories';
import Colors from './SidebarComponents/Colors';
// import Filters from './SidebarComponents/Filters';
import Price from './SidebarComponents/Price';
import Size from './SidebarComponents/Size';
import SubCategories from './SidebarComponents/SubCategories';

const LeftSidebar = () => {

  return (
    <>
      <div className="col-xxl-3 col-lg-4 wow fadeInUp">
        <div className="left-box">
          <div className="shop-left-sidebar">
            <div className="back-button">
              <h3>
                <i className="fa-solid fa-arrow-left" /> Back
              </h3>
            </div>
            <div className="accordion custome-accordion" id="accordionExample">
              <Categories />
              <SubCategories />
              <Price />
              <Size />
              <Colors />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
