import React, { useState } from 'react'
import Breadcrumb from '../shared/Breadcrumb';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import QuickViewModal from '../Home/QuickViewModal';

const Shop = () => {

  //********* Modal Popup code start ************
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showQuickView = (productId) => {
    setSelectedProductId(productId);
  };
  //********* Modal Popup code End ************

  return (
    <>
      <Breadcrumb pageName="Shop" />
      {/* <!-- Shop Section Start --> */}
      <section className="section-b-space shop-section">
        <div className="container-fluid-lg">
          <div className="row">
            <LeftSidebar />
            <RightSidebar showQuickView={showQuickView} />
          </div>
        </div>
      </section>
      {/*<!-- Shop Section End --> */}

      <QuickViewModal selectedProductId={selectedProductId} />
    </>
  )
}

export default Shop