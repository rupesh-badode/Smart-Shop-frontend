// src/components/Footer.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="bg-dark text-white pb-2 pt-4" data-aos="fade-up">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4 mb-3" data-aos="fade-right">
            <h5>Smart Shop</h5>
            <p>Your one-stop solution for quality and smart shopping.</p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-3" data-aos="fade-up">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/shop" className="text-white text-decoration-none">Shop</Link></li>
              <li><Link href="#" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-3" data-aos="fade-left">
            <h5>Follow Us</h5>
            <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i> Facebook</a><br />
            <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i> Instagram</a><br />
            <a href="#" className="text-white"><i className="bi bi-github"></i> Github</a><br/>
            <a href='https://e-portflio.netlify.app/' className='text-white'><i className='bi bi-browser-safari'></i> Portfolio</a>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0">© {new Date().getFullYear()} Smart Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
