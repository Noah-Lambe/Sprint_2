// Title:  Final Sprint - Term 2
// Author: Jonathan Strickland - SD12
// Dates:  December 8th, 2024 

import { useEffect, useState } from 'react';
import './MainContent.css'
import logo from '../assets/images/annies_electronics.jpg'
import ad from '../assets/images/laptopsale.png'

function MainContent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

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
    
    if (loading) return <p>Loading...</p>
      

    return (
        <main className="main-content">
            <div className="box">
                <div className="small-box">
                <img src={logo} alt="logo" className="logo" />
                    <p>Browse Our Store!</p>
                    <a href='#' className='box-links'>New Arrivals</a>
                    <a href='#' className='box-links'>Shop</a>
                    <a href='#' className='box-links'>Sales</a>
                    <a href='#' className='box-links'>Service</a>
                    <img src={ad} alt="ad" className="ad" />
                </div>
                <div className="large-box">
                <div className="container">
                    <h1 className="title">New Arrivals</h1>
                        <div className="product-card1">
                        {products.map((product) => (
                            <a href='http://localhost:5173/details'><div className="product-card1" key={product.id}>
                                <img src={product.image} alt={product.name} className="product-image1" />
                                
                                {product.id === "1" && (
                                    <>
                                        <h3 className="product-name1">
                                            Apple MacBook Pro 14.2in - Space Grey Apple M3/ 512GB SSD / 8GB RAM
                                        </h3>
                                        <p className="product-price">$1699.99</p>
                                        <button className="add-to-cart">Add to Cart</button>
                                    </>
                                )}
                            </div></a>
                            //     {product.id === "2" && (
                            //         <>
                            //             <h3 className="product-name1">
                            //                 Apple iPhone 16 Plus 512GB - Black
                            //             </h3>
                            //             <p className="product-price">$1629.99</p>
                            //             <button className="add-to-cart">Add to Cart</button>
                            //         </>
                            //     )}
                            //     {product.id === "3" && (
                            //         <>
                            //             <h3 className="product-name1">
                            //                 Apple Watch Series 10 GPS + Cellular, 46mm Jet Black Aluminium Case
                            //             </h3>
                            //             <p className="product-price">$718.99</p>
                            //             <button className="add-to-cart">Add to Cart</button>
                            //         </>
                            //     )}
                            //     {product.id === "4" && (
                            //         <>
                            //             <h3 className="product-name1">
                            //                 Beats By Dr. Dre Studio Pro Over-Ear Noise Cancelling Bluetooth Headphones - Black
                            //             </h3>
                            //             <p className="product-price">$249.99</p>
                            //             <button className="add-to-cart">Add to Cart</button>
                            //         </>
                            //     )}
                            // </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
        </main>
    )
}

export default MainContent;