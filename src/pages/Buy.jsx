import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Buy() {
  const [qty, setQty] = useState(1);
  const product = {
    title: "Wireless Bluetooth Headphones",
    price: 999,
    image: "https://via.placeholder.com/150", // Replace with real product image
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const total = qty * product.price;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛍️ Purchase Product</h2>

      <div className="row justify-content-center">
        <div className="col-md-8" data-aos="zoom-in">
          <div className="card p-4 shadow-lg rounded-4 border-0">
            <div className="row g-3 align-items-center">
              <div className="col-md-4 text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded-3"
                />
              </div>
              <div className="col-md-8">
                <h5 className="card-title">{product.title}</h5>
                <p className="text-muted mb-1">Price: ₹{product.price}</p>

                <div className="d-flex align-items-center mb-3">
                  <span className="me-2">Quantity:</span>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => qty > 1 && setQty(qty - 1)}
                  >
                    <i className="bi bi-dash-circle"></i>
                  </button>
                  <span>{qty}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2"
                    onClick={() => setQty(qty + 1)}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </div>

                <h5>Total: ₹{total}</h5>

                <button className="btn btn-success mt-3 w-100 rounded-pill">
                  <i className="bi bi-bag-check-fill me-2"></i> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
