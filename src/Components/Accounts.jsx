import React, { useState, useEffect } from "react";
import "./Accounts.css";

const AccountPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/accounts")
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newAccount = {
      id: Date.now(),
      username: formData.username,
      password: "hashed_" + formData.password,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      addresses: [
        {
          id: 1,
          type: "primary",
          street: formData.street,
          unit: formData.unit,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      ],
      paymentMethods: [
        {
          id: 1,
          type: "credit_card",
          cardNumber: formData.cardNumber.replace(/.(?=.{4})/g, "*"),
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          cardholderName: formData.cardholderName,
        },
        {
          id: 2,
          type: "bank_account",
          bankName: formData.bankName,
          accountNumber: formData.accountNumber.replace(/.(?=.{4})/g, "*"),
          routingNumber: formData.routingNumber,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
      });

      if (response.ok) {
        const savedAccount = await response.json();
        setAccounts((prev) => [...prev, savedAccount]);
        alert("Account successfully registered!");
        setFormData({
          username: "",
          password: "",
          email: "",
          phoneNumber: "",
          street: "",
          unit: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardholderName: "",
          bankName: "",
          accountNumber: "",
          routingNumber: "",
        });
      } else {
        console.error("Failed to save account:", response.statusText);
        alert("Failed to register account. Please try again.");
      }
    } catch (error) {
      console.error("Error saving account:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = accounts.find(
      (acc) => acc.username === formData.username && acc.password === "hashed_" + formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedInUser(user);
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    alert("Logged out successfully!");
  };

  return (
    <div className="account-page">
      {loggedInUser ? (
        <div className="successfulLogIn">
          <h2>Welcome, {loggedInUser.username}!</h2>
          <button className="logOut-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="grid-container">
            <div className="login-section">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button className="logIn-btn" type="submit">Login</button>
            </form>
          </div>
          <hr />
          <div className="register-section">
            <h2>Register an Account</h2>
            <form onSubmit={handleRegister}>
              <h3>Account Details</h3>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />

              <h3>Address</h3>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit (optional)"
                value={formData.unit}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />

              <h3>Payment Information</h3>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cardholderName"
                placeholder="Cardholder Name"
                value={formData.cardholderName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="routingNumber"
                placeholder="Routing Number"
                value={formData.routingNumber}
                onChange={handleInputChange}
              />

              <button className="logIn-btn" type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
