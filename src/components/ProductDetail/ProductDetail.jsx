import React, { useState } from "react";
import Breadcrumb from "../shared/Breadcrumb";
import NavTabs from "./NavTabs";
import ProductLeftSidebar from "./ProductLeftSidebar";
import RelatedProduct from "./RelatedProduct";
import { useParams } from "react-router-dom";
import QuickViewModel from "../Home/QuickViewModal";

const ProductDetail = () => {
  const { productId } = useParams();

  //********* Modal Popup code start ************
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showQuickView = (productId) => {
    setSelectedProductId(productId);
    console.log(productId);
  };
  //********* Modal Popup code End ************

  return (
    <>
      <Breadcrumb pageName="Product Detail" />
      {/* <!-- Product Left Sidebar Start --> */}
      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 wow fadeInUp">
              <ProductLeftSidebar productId={productId} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Product Left Sidebar End --> */}

      {/* <!-- Nav Tab Section Start --> */}
      <NavTabs productId={productId} />
      {/* <!-- Nav Tab Section End --> */}

      {/* <!-- Related Product Section Start --> */}
      <RelatedProduct showQuickView={showQuickView} />
      {/* <!-- Related Product Section End --> */}

      <QuickViewModel selectedProductId={selectedProductId} />
    </>
  );
};

export default ProductDetail;
