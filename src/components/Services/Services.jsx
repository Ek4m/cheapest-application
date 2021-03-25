import React from 'react'
import './Services.css'
const Services = () => {
    return (
        <div className="main-container">
        <div className="container">
            <div className="row">
                <div className="card-deck mb-3 text-center d-flex justify-content-evenly flex-wrap">
                    <div className="card mb-4 box-shadow col-sm-10 col-md-5">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Free</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>

                            <p>Great For Beginners</p>
                            <hr />

                            <ul className="list-unstyled mt-3 mb-4">
                                <li>10 users included</li>
                                <li>2 GB of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary select-btn">Select
                                Plan</button>
                        </div>
                    </div>
                    <div className="card mb-4 box-shadow col-sm-10 col-md-5">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Premium</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">$15 <small className="text-muted">/ mo</small></h1>

                            <p>Recommended for employees</p>
                            <hr />

                            <ul className="list-unstyled mt-3 mb-4">
                                <li>20 users included</li>
                                <li>10 GB of storage</li>
                                <li>Priority email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-primary select-btn">Select
                                Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default Services
