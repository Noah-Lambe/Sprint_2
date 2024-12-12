// CheckoutPortal.jsx

import React, { useState, useEffect } from 'react';
import './Checkout.css';

const CheckoutPortal = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
  });
  const [addresses, setAddresses] = useState([]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newPayment = { ...paymentDetails, method: paymentMethod };
    localStorage.setItem('payments', JSON.stringify([...getStoredPayments(), newPayment]));
    setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '', bankName: '', accountNumber: '', routingNumber: '' });
  };

  const getStoredPayments = () => {
    return JSON.parse(localStorage.getItem('payments')) || [];
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAddress = {
      id: Date.now(),
      fullName: form.fullName.value,
      phoneNumber: form.phoneNumber.value,
      country: form.country.value,
      address: form.address.value,
      unit: form.unit.value,
      city: form.city.value,
      state: form.state.value,
      postalCode: form.postalCode.value,
    };
    setAddresses((prev) => [...prev, newAddress]);
    localStorage.setItem('addresses', JSON.stringify([...getStoredAddresses(), newAddress]));
    form.reset();
  };

  const getStoredAddresses = () => {
    return JSON.parse(localStorage.getItem('addresses')) || [];
  };

  const removeAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  useEffect(() => {
    setAddresses(getStoredAddresses());
  }, []);

  return (
    <div className="checkout-portal">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="product-details">
          <p className="product-name">MSI Ventus 2x Graphics Card</p>
          <p className="product-price">$376.99</p>
          <p className="product-quantity">Nvidia RTX 3060 Qty: 1</p>
        </div>
        <div className="discount-section">
          <input type="text" placeholder="Gift or discount code" className="discount-input" />
          <button className="apply-button">Apply</button>
        </div>
        <div className="price-summary">
          <p>Subtotal: <span>$433.54</span></p>
          <p>Shipping: <span>$29.99</span></p>
          <p>Total (incl. $56.55 taxes): <span>$463.53</span></p>
        </div>
      </div>

      <div className="payment-section">
        <h2>Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="payment-method">
            <label>
              <input type="radio" name="payment-method" value="Card" onChange={() => handlePaymentChange('Card')} /> Card
            </label>
            <label>
              <input type="radio" name="payment-method" value="Bank" onChange={() => handlePaymentChange('Bank')} /> Bank
            </label>
          </div>
          {paymentMethod === 'Card' && (
            <div className="card-details">
              <input type="text" placeholder="Card Number" onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} />
              <input type="text" placeholder="Expiration Date (MM/YY)" onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })} />
              <input type="text" placeholder="CVV" onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} />
            </div>
          )}
          {paymentMethod === 'Bank' && (
            <div className="bank-details">
              <input type="text" placeholder="Bank Name" onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })} />
              <input type="text" placeholder="Account Number" onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })} />
              <input type="text" placeholder="Routing Number" onChange={(e) => setPaymentDetails({ ...paymentDetails, routingNumber: e.target.value })} />
            </div>
          )}
          <button type="submit" className="pay-button">Pay</button>
        </form>
      </div>

      <div className="address-form">
        <h2>Shipping Address</h2>
        <form onSubmit={handleAddressSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" required />
          <input type="text" name="country" placeholder="Country" required />
          <input type="text" name="address" placeholder="Street Address" required />
          <input type="text" name="unit" placeholder="Unit (optional)" />
          <input type="text" name="city" placeholder="City" required />
          <select name="state" required>
            <option value="">Select State</option>
            <option value="Other">Other</option>
            {/* Add state options here */}
          </select>
          <input type="text" name="postalCode" placeholder="Postal Code" required />
          <button type="submit" className="submit-btn">Add Address</button>
        </form>
        <div className="address-list">
          <h3>Saved Addresses</h3>
          <ul>
            {addresses.map((addr) => (
              <li key={addr.id}>
                <p>{addr.fullName}, {addr.address}, {addr.city}, {addr.state}, {addr.postalCode}</p>
                <button onClick={() => removeAddress(addr.id)} className="delete-btn">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPortal;
