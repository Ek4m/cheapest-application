import React from 'react'

const OrderProduct = (props) => {
    return (
        <div className="row mb-4">
        <div className="col">
            <div className="card card-2">
                <div className="card-body">
                    <div className="media">
                        {/* <div className="sq align-self-center d-flex justify-content-center">
                            <img className="img-fluid my-auto align-self-center p-0 mb-4"
                                src={props.image} width="200" height="200" />
                        </div> */}
                        <div className="media-body my-auto text-right">
                            <div className="row my-auto flex-column flex-md-row text-center">
                                <div className="col my-auto">
                                    <h6 className="mb-0">{props.name} by <b>{props.restName}</b></h6>
                                </div>
                                <div className="col my-auto">
                                    <small>Quantity : <strong>{props.quantity}</strong></small>
                                </div>
                                <div className="col my-auto">
                                    <h6 className="mb-0">
                                        &#8380;
                                        <strong> {props.amount}</strong>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default OrderProduct
