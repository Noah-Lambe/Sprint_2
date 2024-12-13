import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import shoppingBag from '/assets/images/shopping_bag.png';
import './ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams(); // Extract productId from URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                const selectedProduct = data.products.find(item => item.id === String(productId));
                setProduct(selectedProduct);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, [productId]);

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='wrapper'>
            <div className='image-container'>
                <img className="productImage" src={product.image} alt={product.name} />
                <p>{product.description}</p>
            </div>
            <div className='price-container'>
                <p>{product.name}</p>
                <div className='button-wrapper'>
                    <p>${product.price}</p>
                    <button className='cartButton'>
                        <img src={shoppingBag} className='shoppingBag' alt="Shopping Bag" />
                        Add to Bag
                    </button>
                </div>
                {/* Other UI elements */}
            </div>
        </div>
    );
}

export default ProductDetails;
