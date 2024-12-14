import React, { useState, useEffect } from 'react';

const DeliveryOptions = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const handleOptionSelected = async (isDelivery) => {
    setSelectedOption(isDelivery ? 'delivery' : 'pickup');

    // Update server and local state for each product in the cart
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.inCart) {
          try {
            const response = await fetch(`http://localhost:3000/products/${product.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                deliverySelected: isDelivery,
              }),
            });

            if (!response.ok) {
              throw new Error(`Failed to update product ${product.id}`);
            }

            const updatedProduct = await response.json();
            console.log("Successfully updated product:", updatedProduct);
            return updatedProduct;
          } catch (error) {
            console.error("Error updating delivery option:", error);
          }
        }
        return product;
      })
    );

    setProducts(updatedProducts);
  };

  return (
    <div className="delivery-options">
      <button
        className={`delivery-option ${selectedOption === 'delivery' ? 'selected' : ''}`}
        onClick={() => handleOptionSelected(true)}
      >
        <p className="bold">Delivery</p>
        <p>Free shipping on most orders over $35</p>
      </button>
      <button
        className={`delivery-option ${selectedOption === 'pickup' ? 'selected' : ''}`}
        onClick={() => handleOptionSelected(false)}
      >
        <p className="bold">Pickup</p>
        <p>Ready in as little as 1 hour</p>
      </button>
    </div>
  );
};

export default DeliveryOptions;
