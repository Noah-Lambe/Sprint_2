// Title:  Final Sprint - Term 2
// Author: Noah Whiffen - SD12
// Dates:  December 5th, 2024 - 

import React, { useState, useEffect } from 'react';
import shoppingBag from '/assets/images/shopping_bag.png'
import './ProductDetails.css';

function ProductDetails({productId}) {
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('./db.json')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); 
                if (data.products && Array.isArray(data.products)) {
                    const selectedProduct = data.products.find(item => item.id === String(productId));
                    setProduct(selectedProduct);
                } else {
                    console.error('No products array found in the data.');
                }
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, [productId]);

	const handleQuantityChange = (event) => {
		setQuantity(Number(event.target.value));
	}

	if (!product) { // This is to ensure state isn't null before accessing it's properties.
        return <div>Loading...</div>;
    }


		return(
            <>
            
                <div className='wrapper'>
                        <div className='image-container'>
                                <img  className="productImage" src={product.image} alt={product.name}/>
                                <p>
                                    {product.description}
                                </p>
                        </div>
                        <div className='price-container'>
                            <p>
                                {product.name}
                            </p>
                            <div className='button-wrapper'>
                                <p>
                                    ${product.price}
                                </p>
                                <button className='cartButton'>
                                    <img src={shoppingBag} 
                                        className='shoppingBag'/>
                                    Add to Bag
                                </button>
                            </div>
                            <div className='delivery-container'>
                                <p>
                                    FREE delivery Tuesday, December 10th
                                    <br/>
                                    Or fastest delivery, Monday, December 9th.
                                </p>
                                <label>
                                    <span>In Stock</span>
                                    <select className='dropdown'
                                                    value={quantity}
                                                    onChange={handleQuantityChange}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        Quantity: 
                                    </select>
                                </label>
                                <h2>
                                    Add a Protection Plan:
                                </h2>
                                <div className='radio-container'>
                                    <input type="radio" id="plan3year" name="protectionPlan" value="3-Year" />
                                    <label htmlFor="plan3year">3-Year Protection Plan for $64.99</label>
                                </div>
                                <div className='radio-container'>
                                    <input type="radio" id="plan4year" name="protectionPlan" value="4-Year" />
                                    <label htmlFor="plan4year">4-Year Protection Plan for $84.99</label>
                                </div>
                                <div className='radio-container'>
                                    <input type="radio" id="plan5year" name="protectionPlan" value="5-Year" />
                                    <label htmlFor="plan5year">5-Year Protection Plan for $104.99</label>
                                </div>
                                <div className='radio-container'>
                                    <input type="radio" id="giftReceipt" name="giftReceipt" />
                                    <label htmlFor="giftReceipt">Add a gift receipt for easy returns</label>
                                </div>
                            </div>
                        </div>
                </div>
                </>
    );
}

export default ProductDetails;