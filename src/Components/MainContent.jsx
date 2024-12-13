import React, { useState, useEffect } from 'react'; // Import React and hooks
import { Link } from 'react-router-dom'; // Import Link for navigation
import './MainContent.css'; // Import your CSS file
import logo from '../assets/images/annies_electronics.jpg'; // Import logo
import ad from '../assets/images/laptopsale.png'; // Import ad image

function MainContent() {
    const [products, setProducts] = useState([]); // State for products
    const [loading, setLoading] = useState(true); // State for loading status

    // Fetch products from the server when the component mounts
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data); // Store the fetched products
                setLoading(false); // Set loading to false
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
                setLoading(false); // Handle fetch errors
            });
    }, []);

    // Handle adding a product to the cart
    const handleAddToCart = (id) => {
        // Update the server to mark the product as "inCart"
        fetch(`http://localhost:3000/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inCart: true }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update server");
                }
                // Update the local state to reflect the change
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === id ? { ...product, inCart: true } : product
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating product on server:", error);
            });
    };

    // Show a loading message while data is being fetched
    if (loading) return <p>Loading...</p>;

    return (
        <main className="main-content">
            <div className="box">
                <div className="small-box">
                    <img src={logo} alt="logo" className="logo" />
                    <p>Browse Our Store!</p>
                    <a href="#" className="box-links">New Arrivals</a>
                    <a href="#" className="box-links">Shop</a>
                    <a href="#" className="box-links">Sales</a>
                    <a href="#" className="box-links">Service</a>
                    <img src={ad} alt="ad" className="ad" />
                </div>
                <div className="large-box">
                    <div className="container">
                        <h1 className="title">New Arrivals</h1>
                        <div className="product-card1">
                            {products.map((product) => (
                                <div className="product-card1" key={product.id}>
                                    <img src={product.image} alt={product.name} className="product-image1" />
                                    {/* Link to navigate to the product details page */}
                                    <Link to={`/product/${product.id}`} className="product-name1">
                                        {product.name}
                                    </Link>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    {/* Add to Cart Button */}
                                    <button
                                        className="add-to-cart"
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={product.inCart}
                                    >
                                        {product.inCart ? "In Cart" : "Add to Cart"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainContent;
