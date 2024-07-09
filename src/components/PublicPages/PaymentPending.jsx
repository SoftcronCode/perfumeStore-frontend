import React from 'react'

const PaymentPending = () => {
    return (
        <>
            <section className="breadscrumb-section pt-0">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadscrumb-contain breadscrumb-order">
                                <div className="order-box">
                                    <div className="order-image">
                                        <img src="/assets/images/inner-page/order-success.png" className="blur-up lazyloaded" alt="" />
                                    </div>

                                    <div className="order-contain">
                                        <h3 className="theme-color">Order Success But Payment is Pending.</h3>
                                        <h5 className="text-content">Go to Order Page and confirm Pending Payment to complete order.</h5>
                                        <div className='text-center'>
                                            <button class="btn btn-md mt-3 theme-bg-color text-white m-auto">Go To Order Page</button>
                                        </div>
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

export default PaymentPending