import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import * as bootstrap from 'bootstrap'; // 👈 required for controlling collapse



export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));
  const count = useSelector((state) => state.cart.cartItemsCount);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const LogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNavDropdown');
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
    bsCollapse.hide();
  };

  
  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
  const handleClickOutside = (event) => {
    const collapseEl = document.getElementById('navbarNavDropdown');
    const toggler = document.querySelector('.navbar-toggler');
    if (
      collapseEl &&
      collapseEl.classList.contains('show') &&
      !collapseEl.contains(event.target) &&
      !toggler.contains(event.target)
    ) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
      bsCollapse.hide();
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-bag-fill fs-4 me-2 text-warning"></i>
          <span className="fw-bold">SmartShop</span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}   ><i className="bi bi-house-fill me-1" ></i> Home</Link>
            </li>

            {/* ✅ Correct conditional rendering */}
            {role !== "seller" && (
              <li className="nav-item">
                <Link className="nav-link" to="/shop"onClick={closeNavbar} ><i className="bi bi-shop me-1"></i> Shop</Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact"onClick={closeNavbar} ><i className="bi bi-envelope me-1"></i> Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#"onClick={closeNavbar} ><i className="bi bi-exclamation-circle"></i> About</Link>
            </li>
            <li className="nav-item">
              {role === "seller" ? (
                <Link className="nav-link text-warning" to="/dashboard" onClick={closeNavbar} ><i className="bi bi-speedometer2"></i> Dashboard</Link>
              ) : (
                <Link className="nav-link text-warning" to="/seller" onClick={closeNavbar} ><i className="bi bi-shop-window"></i> Become a seller</Link>
              )}
            </li>
          </ul>

          {/* Right side: Search, Login, Cart */}
          <div className="d-flex flex-column flex-lg-row align-items-center gap-2 ms-lg-auto mt-3 mt-lg-0">
            {/* Search */}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="btn btn-outline-light" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Login Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person"></i> {role ? user?.name : "Login"}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="userDropdown">
                {!role ? (
                  <>
                    <li><Link className="dropdown-item" to="/signup"onClick={closeNavbar} >New Customer?</Link></li>
                    <li><Link className="dropdown-item" to="/login" onClick={closeNavbar} ><i className="bi bi-person-badge"></i> Login</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/profile" onClick={closeNavbar} ><i className="bi bi-person-fill"></i> My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/order" onClick={closeNavbar} ><i className="bi bi-box"></i> Orders</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item text-danger" to="/login" onClick={LogOut} ><i className="bi bi-box-arrow-left"></i> Logout</Link></li>
                  </>
                )}
              </ul>
            </div>

            {/* Cart */}
            <Link to="/cart" className="btn btn-sm btn-outline-light position-relative gap-1 px-3"onClick={closeNavbar} >
              <i className="bi bi-cart-fill fs-5"></i>
              {count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
