import React from 'react'
import NewProductSlider from './NewProductSlider'
import FeaturedProductSlider from './FeaturedProductSlider'
import BestProductSlider from './BestProductSlider'
import DiscountProductSlider from './DiscountProductSlider'

const SliderContainer = ({showQuickView}) => {
  return (
    <>
<section className="product-section-2">
    <div className="container-fluid-lg">
        <div className="row gy-sm-5 gy-4">
            <div className="col-xxl-3 col-md-6">
                <NewProductSlider showQuickView={showQuickView}/>
            </div>
            <div className="col-xxl-3 col-md-6">
                <BestProductSlider showQuickView={showQuickView}/>
            </div>
            <div className="col-xxl-3 col-md-6">
                <FeaturedProductSlider showQuickView={showQuickView}/>
            </div>
            <div className="col-xxl-3 col-md-6">
                <DiscountProductSlider showQuickView={showQuickView}/>
            </div>
        </div>
    </div>
</section>

    </>
  )
}

export default SliderContainer