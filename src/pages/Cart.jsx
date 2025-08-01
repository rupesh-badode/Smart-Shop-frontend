import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  decreaseQty as decreaseQtyAction
} from '../redux/slicer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [step, setStep] = useState(1);

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQty = (item) => {
    dispatch(addToCart(item));
  };

  const decreaseQty = (item) => {
    dispatch(decreaseQtyAction(item));
  };

  const validateForm = () => {
    let err = {};
    if (!shippingInfo.name) err.name = "Name is required";
    if (!shippingInfo.address) err.address = "Address is required";
    if (!shippingInfo.city) err.city = "City is required";
    if (!shippingInfo.pincode) err.pincode = "Pincode is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const placeOrder = (order) => {
    console.log("Placing order:", order);
    localStorage.setItem('lastOrder', JSON.stringify(order));
  };

  const payWithRazorpay = () => {
    const options = {
      key: "rzp_test_yQ3wzRyUxUTYJO", // Replace with your Razorpay key
      amount: totalPrice * 100,
      currency: "INR",
      name: "SmartShop",
      description: "Order Payment",
      handler: function (response) {
        const order = {
          id: Date.now(),
          items: cartItems,
          shippingInfo,
          paymentMethod,
          paymentId: response.razorpay_payment_id,
          date: new Date().toLocaleString()
        };
        placeOrder(order);
        setStep(4);
      },
      prefill: {
        name: shippingInfo.name,
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleNext = () => {
    if (step === 2) {
      if (cartItems.length === 0) return alert("Your cart is empty!");
      setStep(3);
    } else if (step === 3) {
      if (validateForm()) {
        if (paymentMethod === "cod") {
          const order = {
            id: Date.now(),
            items: cartItems,
            shippingInfo,
            paymentMethod,
            date: new Date().toLocaleString()
          };
          placeOrder(order);
          setStep(4);
        } else {
          payWithRazorpay();
        }
      }
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">🛒 Your Shopping Cart</h3>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <div className="alert alert-info text-center">No items in cart</div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="card mb-3 shadow-sm" data-aos="fade-up">
                <div className="row g-0 align-items-center">
                  <div className="col-3">
                    <img src={item.image} alt={item.title} className="img-fluid p-2" />
                  </div>
                  <div className="col-5">
                    <div className="card-body">
                      <h6 className="card-title">{item.title}</h6>
                      <p className="card-text text-muted">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-end pe-3">
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => decreaseQty(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => increaseQty(item)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 m-4">
            <h5 className="mb-3">Cart Summary</h5>
            <p><strong>Total Items:</strong> {totalQuantity}</p>
            <p><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
            <button className="btn btn-success w-100 mt-3" onClick={() => setStep(2)}>Place Order</button>
          </div>

          {step === 2 && (
            <div>
              <h4>Select Payment Method</h4>
              <select className="form-select w-50" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Card Payment</option>
                <option value="upi">UPI</option>
              </select>
              <button className="btn btn-primary mt-3" onClick={handleNext}>Continue to Shipping</button>
            </div>
          )}

          {step === 3 && (
            <>
              <h4>Shipping Info</h4>
              <input placeholder="Name" className="form-control mb-2" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
              {errors.name && <div className="text-danger">{errors.name}</div>}
              <input placeholder="Address" className="form-control mb-2" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
              {errors.address && <div className="text-danger">{errors.address}</div>}
              <input placeholder="City" className="form-control mb-2" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} />
              {errors.city && <div className="text-danger">{errors.city}</div>}
              <input placeholder="Pincode" className="form-control mb-2" value={shippingInfo.pincode} onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })} />
              {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
              <button className="btn btn-success mt-3" onClick={handleNext}>Place Order</button>
            </>
          )}

          {step === 4 && (
            <div className="text-center">
              <h2 className="text-success">🎉 Order Confirmed!</h2>
              <p>Thank you, <strong>{shippingInfo.name}</strong>! Your order will be shipped to:</p>
              <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.pincode}</p>
              <p>Payment Method: <strong>{paymentMethod.toUpperCase()}</strong></p>
              <button className="btn btn-outline-primary mt-3" onClick={() => setStep(1)}>Back to Cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
