import React from 'react'

const OrderSuccess = () => {
    return (
        <>
            <section className="breadscrumb-section pt-0">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadscrumb-contain breadscrumb-order">
                                <div className="order-box">
                                    <div className="order-image">
                                        <img src="/assets/images/inner-page/order-success.png" className="blur-up lazyloaded" alt=""/>
                                    </div>

                                    <div className="order-contain">
                                        <h3 className="theme-color">Order Success</h3>
                                        <h5 className="text-content">Order Successfully Placed And Your Order Is On The Way.</h5>
                                        <h6>Your order will be delivered in 3 -- 5 business days.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderSuccess