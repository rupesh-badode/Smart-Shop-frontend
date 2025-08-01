import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useLocation} from 'react-router-dom';
import {addToCart} from "../redux/slicer"
import { useDispatch } from 'react-redux';
 

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const dispatch = useDispatch();


  const user =  localStorage.getItem("role");
 
  function useQuery(){
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const searchTerm = query.get('search')?.toLowerCase() || "";

  useEffect(() => {
    AOS.init({ duration: 1000 });

    axios.get("http://127.0.0.1:3300/products")
    .then(function(res){
      setProducts(res.data)
    })
    .catch(function(err){
      console.log(err);
    })
    .finally(function(){
  
    });
  }, []);  

  if(!products){
    return(
      <div className='spinner-border m-5' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    )
  }

  const filteredProducts = products
    .filter((item) => filter === 'all' || item.category === filter)
    .filter((item) =>
        (minPrice === '' || item.price >= parseFloat(minPrice)) &&
        (maxPrice === '' || item.price <= parseFloat(maxPrice))
    )
    .filter((item)=>  item.title.toLowerCase().includes(searchTerm))

  const categories = [
    'all',
    "men's clothing",
    "women's clothing",
    'jewelery',
    'electronics',
  ];

  function addToCartClick(item){
    dispatch(addToCart(item));
  }


const handleBuyNow = (item) => {
  const options = {
    key: "rzp_test_yQ3wzRyUxUTYJO",
    amount: item.price , 
    currency: "INR",
    name: "SmartShop",
    description: item.title,
    image: item.image,
    handler: function (response) {
      alert("Payment Successful! Razorpay ID: " + response.razorpay_payment_id);
      // Optionally: Save order to backend/localStorage here
    },
    prefill: {
      name: "Customer",
      email: "customer@example.com",
      contact: "9999999999"
    },
    theme: {
      color: "#3399cc"
    }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <>
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Fixed Left Filters */}
        <div className="col-md-3 mb-4">
          <div className="position-sticky" style={{ top: '100px' }}>
            <h5>Filter by Category</h5>
            <ul className="list-group mb-3">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`list-group-item ${
                    filter === cat ? 'active' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            <h6 className="mt-3">Filter by Price</h6>
            <div className="input-group mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setMinPrice('');
                setMaxPrice('');
              }}
            >
              Clear Price Filter
            </button>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map((item) => (
              <div key={item.id} className="col-md-4 mb-4" data-aos="fade-up">
                <div className="card h-100 shadow-sm product-card">
                  <Link to={`/shop/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={item.image} className="card-img-top p-3" alt={item.title}
                      style={{ height: '250px', objectFit: 'contain', cursor: 'pointer' }} />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    <p className="card-text text-muted">
                      {item.description.slice(0, 80)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">₹{item.price}</span>
                      <span className="badge bg-info text-dark bi bi-star-fill">
                        {item.rating?.rate ?? "N/A"} ({item.rating?.count ?? 0})
                      </span>
                    </div>
                  </div>
                  <div className="card-footer text-center d-flex gap-2">
                    <button className="btn btn-sm btn-success w-50" onClick={()=>handleBuyNow(item)} >
                      Buy Now
                    </button>
                    <button
                      className="btn btn-sm btn-primary w-50"
                      onClick={() => addToCartClick(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

            ))}
            {filteredProducts.length === 0 && (
                <div className="text-center mt-4">
                  {searchTerm ? (
                    <p>No products found for search: <strong>{searchTerm}</strong></p>
                  ) : (
                    <p>No products found for selected filters.</p>
                  )}
                </div>
              )}

          </div>
        </div>
      </div>
    </div>

  </>
  );
}
