import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderSummary from './Components/OrderSummary';
import DeliveryOptions from './Components/DeliveryOptions';
import Header from './Components/Header';
import Cart from './Components/Cart';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import CheckoutPortal from './Components/Checkout';
import CheckoutSummary from './Components/CheckoutSummary';
import AccountPage from './Components/Accounts';
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the JSON server
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const inCartProducts = data.filter((product) => product.inCart);
        setProducts(inCartProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  const handleCartUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route
            path="/cart"
            element={
              <div className="content-box">
                <Cart onCartUpdate={handleCartUpdate} />
                <DeliveryOptions />
                <OrderSummary products={products} />
              </div>
            }
          />
          <Route 
            path="/checkout" 
            element={
              <div className='checkout-content'>
                <CheckoutSummary products={products} className="order-summary-content"/>
                <CheckoutPortal className="checkout-summary-content"/>
              </div>
            }
          />
          <Route 
            path="/accounts" 
            element={
              <div className='account-content'>
                <AccountPage />
              </div>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
