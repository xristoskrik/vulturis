import React, { useState, useEffect } from "react";
import "./checkout.css";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";

const Register = () => {
  const { handleToken, user, isLoggedIn, userData } = useAuth();
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSn] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [altAddress, setAltAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    handleToken(); // Ensure token handling is done
  }, []);

  useEffect(() => {
    console.log(user, isLoggedIn);
    setEmail(user || ""); // Avoid setting undefined values

    if (userData) {
      setName(userData.name || "");
      setSn(userData.surname || "");
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
      setMobile(userData.mobile || "");
    }
  }, [user, userData]);

  const totalCost = cart.reduce(
    (total, item) => total + (parseFloat(item.price) || 0) * item.quantity, // Ensure price is a number
    0
  );

  const shippingCost = deliveryMethod === "store" ? 0 : 3.0;
  const vat = totalCost * 0.21;
  const finalTotal = totalCost + shippingCost + vat;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      name,
      surname,
      phone,
      address: shipToDifferent ? altAddress : address,
      mobile,
    };
    console.log("User Data:", user);
    console.log("User cart:", cart);
  };

  return (
    <div className="checkout-container">
      <div className="cart-container">
        {/* Moved Coupon Code Section to the Start */}
        <div className="coupon">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="button">Apply</button>
        </div>

        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div className="cart-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>${(parseFloat(product.price) || 0).toFixed(2)}</p>{" "}
                  {/* Ensure price is a valid number */}
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateCartQuantity(product.id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartQuantity(product.id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="remove-item-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="delivery-options">
          <h3>Delivery Options</h3>
          <label>
            <input
              type="radio"
              value="home"
              checked={deliveryMethod === "home"}
              onChange={() => setDeliveryMethod("home")}
            />
            Home Delivery ($3.00)
          </label>
          <label>
            <input
              type="radio"
              value="store"
              checked={deliveryMethod === "store"}
              onChange={() => setDeliveryMethod("store")}
            />
            Store Pickup (Free)
          </label>
        </div>
        <div className="total-cost">
          <h3>Subtotal: ${totalCost.toFixed(2)}</h3>{" "}
          {/* Ensure totalCost is a number */}
          <h3>VAT: ${vat.toFixed(2)}</h3> {/* Ensure vat is a number */}
          <h3>Shipping: ${shippingCost.toFixed(2)}</h3>{" "}
          {/* Ensure shippingCost is a number */}
          <h2>Final Total: ${finalTotal.toFixed(2)}</h2>{" "}
          {/* Ensure finalTotal is a number */}
        </div>
      </div>

      <div className="checkout-form">
        <h1 className="title">Shipment Details</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email <span className="required">*</span>:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="name" className="label">
                Name <span className="required">*</span>:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname" className="label">
                Surname <span className="required">*</span>:
              </label>
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSn(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="label">
              Phone <span className="required">*</span>:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="label">
              Address <span className="required">*</span>:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">
              <input
                type="checkbox"
                checked={shipToDifferent}
                onChange={(e) => setShipToDifferent(e.target.checked)}
              />
              Ship to a different address
            </label>
          </div>
          {shipToDifferent && (
            <div className="form-group">
              <label htmlFor="altAddress" className="label">
                Alternative Address:
              </label>
              <input
                type="text"
                id="altAddress"
                value={altAddress}
                onChange={(e) => setAltAddress(e.target.value)}
                className="input"
                required
              />
            </div>
          )}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
