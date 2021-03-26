import React, { memo } from 'react';
import './ProductFilter.css';
const ProductFilter =React.forwardRef((props, ref) => {
    console.log('rendered')
        return (
            <div className="ProductFilter">
                <div className="filter--control">
                    <label htmlFor="prodPrice">Price:</label>
                <input
                ref={ref}
                type="range" 
                onChange={props.changed}
                value={props.price}
                min="0"
                step="2" 
                max="200" 
                name="price" 
                id="prodPrice"/>
                <code>Up to {props.price} m</code>
                </div>
                <div className="filter--control">
                    <div className="filter--control__box">
                        <label htmlFor="low_to_expensive">
                        <input type="checkbox"  onChange={() => props.change('low_to_expensive')}  checked={props.listStyle === 'low_to_expensive'} id="low_to_expensive"/>
                        <div className="control__box__input"></div>
                            Cheap to Expensive</label>

                    </div>
                    <div className="filter--control__box">
                        <label htmlFor="expensive_to_low">Expensive to Cheap
                        <input type="checkbox" 
                        onChange={() => props.change('expensive_to_low')}
                        checked={props.listStyle === 'expensive_to_low'}
                        id="expensive_to_low"/>

                        <div className="control__box__input">

                        </div>
                        </label>
                        

                    </div>
                </div>
            </div>
        )
})


export default ProductFilter