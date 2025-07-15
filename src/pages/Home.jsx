// src/components/LandingPage.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export default function Home(){
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-5 text-center text-md-start">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6" data-aos="fade-right">
              <h1 className="display-4 fw-bold">Welcome to Smart Shop</h1>
              <p className="lead">
                Discover the best deals on smart gadgets, stylish fashion, and more — all in one place.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg">Start Shopping</Link>
            </div>
            <div className="col-md-6 text-center" data-aos="fade-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/263/263115.png"
                alt="Shopping"
                className="img-fluid"
                style={{ maxHeight: '300px' }}
              />
            </div>-
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-5 text-center">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <i className="bi bi-truck display-5 text-primary mb-3"></i>
              <h5>Fast Delivery</h5>
              <p>Get your orders delivered within 2-3 days across major cities.</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <i className="bi bi-credit-card display-5 text-success mb-3"></i>
              <h5>Secure Payment</h5>
              <p>We offer 100% secure payment options for worry-free shopping.</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="400">
              <i className="bi bi-stars display-5 text-warning mb-3"></i>
              <h5>Top Quality</h5>
              <p>We partner with trusted brands to offer the best products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white text-center py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4">Ready to Shop Smart?</h2>
          <Link to="/shop" className="btn btn-outline-light btn-lg">Explore Our Products</Link>
        </div>
      </section>
    </>
  );
};

