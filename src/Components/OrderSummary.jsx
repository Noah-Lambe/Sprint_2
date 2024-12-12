import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({ products }) => {
  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const calculateTaxes = () => {
    return products.reduce((total, product) => total + (product.price * product.tax), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 35) {
      return 0.00;
    } else {
      return 20.00;
    }
  };

  const calculateDiscount = () => {
    return 0.00;
  };

  const subtotal = calculateSubtotal();
  const taxes = calculateTaxes();
  const shipping = calculateShipping();
  const discount = calculateDiscount();

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
