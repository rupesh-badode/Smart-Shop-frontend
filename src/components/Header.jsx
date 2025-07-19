import React, {  useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";


export default function Header() {
  const[search,setSearch] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);



  const count =  useSelector((state)=>state.cart.cartItemsCount);

  useEffect(() => { 
    AOS.init({ duration: 1000 });
  }, []);

  function handleSearch(){
    if(search.trim()){
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  }

  function LogOut(){
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 fixed-top shadow-sm" data-aos="fade-down">
      <div className="container-fluid">
        {/* Left - Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-bag-fill fs-4 me-2 text-warning"></i>
          <span className="fw-bold">SmartShop</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center and Right */}
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNavDropdown">
          {/* Center Nav Links */}
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item">
              <Link className="nav-link" to="/"><i className="bi bi-house-fill me-1"></i>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop"><i className="bi bi-shop me-1"></i>Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact"><i className="bi bi-envelope me-1"></i>Contact</Link>
            </li>
            <li>
              <Link className="nav-link" ><i className="bi bi-exclamation-circle"></i> About</Link>
            </li>
            <li>
              {role=="seller"?(<Link className="nav-item nav-link text-warning" to="/dashboard"><i className="bi bi-speedometer2"></i>Dashboard</Link>):
              (<Link className="nav-item nav-link text-warning" to="/seller"><i className="bi bi-shop-window "></i> Become a seller</Link>)}
            </li>
          </ul>

          {/* Right - Search, Cart, Login */}
          <div className="d-flex flex-column flex-lg-row align-items-center  gap-2 ms-lg-auto mt-3 mt-lg-0">
            {/* Search Input Group */}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products.."
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={(e)=>e.key==="enter" && handleSearch() }
              />
              <button className="btn btn-outline-light" type="button" onClick={handleSearch} >
                <i className="bi bi-search"></i>
              </button>
            </div>
            {/* Login Dropdown */}
            <div className="nav-item dropdown">
            <button
              className="dropdown-toggle btn btn-light"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person"></i> {role ? user.name : "Login"}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              {!role && (
                <>
                  <li><Link className="dropdown-item" to="/signup">New Customer?</Link></li>
                  <li><Link className="dropdown-item" to="/login"><i className="bi bi-person-badge"></i> Login</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                </>
              )}
              <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person-fill"></i> My Profile</Link></li>
              <li><Link className="dropdown-item" to="/orders"><i className="bi bi-box"></i> Orders</Link></li>
              <li><Link className="dropdown-item text-danger" to="/login" onClick={LogOut} ><i className="bi bi-"></i> Logout</Link></li>
            </ul>
          </div>

            {/* Cart */}
            <Link to="/cart" className="btn btn-sm btn-outline-light position-relative gap-1 px-3">
                <i className="bi bi-cart-fill fs-5"></i>
                {count >0 && (<span className="position-absolute bottom-99 start-90 translate-right  badge rounded-pill bg-danger">{count}</span>)}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
