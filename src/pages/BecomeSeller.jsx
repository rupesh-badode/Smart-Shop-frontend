import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function BecomeSeller() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <i className="bi bi-shop-window display-1 text-primary"></i>
        <h1 className="fw-bold mt-3">Become a Seller</h1>
        <p className="lead text-muted">
          Sell your products to thousands of customers and grow your business online with us.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="row text-center g-4" data-aos="fade-up">
        <div className="col-md-4">
          <div className="p-4 shadow-sm bg-light rounded">
            <i className="bi bi-currency-rupee text-success fs-1"></i>
            <h5 className="mt-3">Zero Setup Cost</h5>
            <p className="text-muted">Start selling without paying any upfront fees or hidden charges.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 shadow-sm bg-light rounded">
            <i className="bi bi-truck text-warning fs-1"></i>
            <h5 className="mt-3">Easy Delivery</h5>
            <p className="text-muted">We handle logistics so you can focus on your products.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 shadow-sm bg-light rounded">
            <i className="bi bi-graph-up-arrow text-info fs-1"></i>
            <h5 className="mt-3">Boost Your Sales</h5>
            <p className="text-muted">Reach a larger audience and increase your revenue effortlessly.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5" data-aos="zoom-in">
        <Link className="btn btn-lg btn-primary px-4 py-2" to="/seller/register" >
         <i className="bi bi-box-arrow-in-right me-2"></i>Start Selling
        </Link>
      </div>
    </div>
  );
}
