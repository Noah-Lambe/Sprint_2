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
  const [payments, setPayments] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newPayment = { ...paymentDetails, method: paymentMethod };
    const updatedPayments = [...getStoredPayments(), newPayment];
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    setPayments(updatedPayments);
    setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '', bankName: '', accountNumber: '', routingNumber: '' });
  };

  const getStoredPayments = () => {
    return JSON.parse(localStorage.getItem('payments')) || [];
  };

  const removePayment = (index) => {
    const updatedPayments = payments.filter((_, i) => i !== index);
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
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
    const updatedAddresses = [...getStoredAddresses(), newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
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
    setPayments(getStoredPayments());
  }, []);

  return (
    <div className="checkout-portal">
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
              <input type="text" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} />
              <input type="text" placeholder="Expiration Date (MM/YY)" value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })} />
              <input type="text" placeholder="CVV" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} />
            </div>
          )}
          {paymentMethod === 'Bank' && (
            <div className="bank-details">
              <input type="text" placeholder="Bank Name" value={paymentDetails.bankName} onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })} />
              <input type="text" placeholder="Account Number" value={paymentDetails.accountNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })} />
              <input type="text" placeholder="Routing Number" value={paymentDetails.routingNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, routingNumber: e.target.value })} />
            </div>
          )}
          <button type="submit" className="pay-button">Save Payment</button>
        </form>
        <div className="payment-list">
          <h3>Saved Payment Methods</h3>
          <ul className="address-list">
            {payments.map((payment, index) => (
              <li key={index}>
                <p>Method: {payment.method}</p>
                {payment.method === 'Card' && (
                  <p>Card Number: **** **** **** {payment.cardNumber.slice(-4)}</p>
                )}
                {payment.method === 'Bank' && (
                  <p>Bank Name: {payment.bankName}</p>
                )}
                <button onClick={() => removePayment(index)} className="delete-btn">Remove</button>
              </li>
            ))}
          </ul>
        </div>
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
            <option value="Newfoundland & Labrador">
                  Newfoundland & Labrador
                </option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Quebec">Quebec</option>
                <option value="Ontario">Ontario</option>
                <option value="Manitoba">Manitoba</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Yukon">Yukon</option>
                <option value="Northwest Territories">
                  Northwest Territories
                </option>
                <option value="Nunavut">Nunavut</option>
                <option value="Other">Other</option>
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
