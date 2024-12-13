import { useEffect, useState } from 'react';
import './MainContent.css';
import logo from '../assets/images/annies_electronics.jpg';
import ad from '../assets/images/laptopsale.png';

function MainContent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (id) => {
        // Update the server
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
                // Update the local state
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
                                    <h3 className="product-name1">{product.name}</h3>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
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
