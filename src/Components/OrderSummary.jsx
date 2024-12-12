import React from "react";

const OrderSummary = ({ products }) => {
  // Calculate the subtotal by summing the prices of all products
  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  // Calculate taxes by summing the product of each product's price and tax rate
  const calculateTaxes = () => {
    return products.reduce((total, product) => total + (product.price * product.tax), 0);
  };

  // Calculate shipping based on the subtotal
  const calculateShipping = () => {
    const subtotal = calculateSubtotal(); // Make sure we calculate the subtotal here
    if (subtotal > 35) {
      return 0.00; // Free shipping if the subtotal is above 35
    } else {
      return 20.00; // Flat shipping fee if the subtotal is less than or equal to 35
    }
  };

  // Calculate discount (currently set to 0, but you can add your logic here)
  const calculateDiscount = () => {
    return 0.00; // No discount in this example
  };

  // Calculate all values
  const subtotal = calculateSubtotal();
  const taxes = calculateTaxes();
  const shipping = calculateShipping();
  const discount = calculateDiscount();

  // Calculate the estimated total
  const estimatedTotal = subtotal + shipping + taxes - discount;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul>
        <li>Product Subtotal: ${subtotal.toFixed(2)}</li>
        <li>Order Discounts: ${discount.toFixed(2)}</li>
        <li>Estimated Shipping: ${shipping.toFixed(2)}</li>
        <li>Estimated Taxes: ${taxes.toFixed(2)}</li>
      </ul>
      <hr />
      <h3>Estimated Total: ${estimatedTotal.toFixed(2)}</h3>
      <hr />
      <button className="continue-btn">Continue to Checkout</button>
      <button className="back-btn">Go back to Shop</button>
      <br />
      
      <p className="add-info-top">Need Information on returns or shipping policies?</p>
      <p className="add-info-bottom">
        Please follow this link to our <a href="#">support page</a> for details.
      </p>
    </div>
  );
};

export default OrderSummary;
