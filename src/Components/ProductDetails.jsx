import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import shoppingBag from '/assets/images/shopping_bag.png';
import './ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) return <div>Loading...</div>;

    if (!product) return <div>Product not found</div>;

    return (
        <div className="wrapper">
            <div className="image-container">
                <img className="productImage" src={product.image} alt={product.name} />
                <p>{product.description}</p>
            </div>
            <div className="price-container">
                <p>{product.name}</p>
                <div className="button-wrapper">
                    <p>${product.price}</p>
                    <button className="cartButton">
                        <img src={shoppingBag} className="shoppingBag" alt="Shopping Bag" />
                        Add to Bag
                    </button>
                </div>
                <div className="delivery-container">
                    <p>
                        FREE delivery Tuesday, December 10th
                        <br />
                        Or fastest delivery, Monday, December 9th.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
