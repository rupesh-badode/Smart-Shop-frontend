import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const orders = [
  {
    id: "#12345",
    date: "2025-07-02",
    status: "Delivered",
    items: 3,
    amount: 1249,
  },
  {
    id: "#12346",
    date: "2025-07-01",
    status: "Shipped",
    items: 1,
    amount: 499,
  },
  {
    id: "#12347",
    date: "2025-06-30",
    status: "Pending",
    items: 2,
    amount: 999,
  },
];

export default function Order() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🛒 My Orders</h2>
      <div className="row">
        {orders.map((order, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index} data-aos="fade-up">
            <div className="card shadow rounded-4 border-0">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-receipt me-2"></i>Order {order.id}
                </h5>
                <p className="card-text">
                  <strong>Date:</strong> {order.date}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span className={`badge bg-${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </p>
                <p className="card-text">
                  <strong>Items:</strong> {order.items}
                </p>
                <p className="card-text">
                  <strong>Total:</strong> ₹{order.amount}
                </p>
                <button className="btn btn-outline-primary rounded-pill w-100">
                  <i className="bi bi-eye me-1"></i> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Delivered":
      return "success";
    case "Shipped":
      return "info";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "danger";
    default:
      return "secondary";
  }
}
