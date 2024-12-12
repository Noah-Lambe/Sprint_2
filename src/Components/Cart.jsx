import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the products when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const inCartProducts = data.filter((product) => product.inCart);
        setProducts(inCartProducts);
        setLoading(false);
        onCartUpdate(inCartProducts);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, [onCartUpdate]);

  const handleRemoveProduct = (productId) => {
    // Remove the product from local state
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    onCartUpdate(updatedProducts);

    // Update the product on the server
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inCart: false, // Mark the product as not in the cart
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product removed from cart:", data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>Your shopping bag is empty!</div>;
  }

  return (
    <div className="product-cards">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <ul className="availability">
            {product.availability.delivery && (
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14">
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                </svg>{" "}
                Available for Delivery
              </li>
            )}
            {product.availability.store && (
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14">
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                </svg>{" "}
                Available at nearby stores
              </li>
            )}
          </ul>
          <hr />
          <div className="price-and-button">
            <p className="price">
              <strong>${product.price.toFixed(2)}</strong>
              <br />
              <small>plus 15% Tax</small>
            </p>
            <button className="remove-button" onClick={() => handleRemoveProduct(product.id)}>
              Remove From Shopping Bag
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
