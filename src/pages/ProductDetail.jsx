// ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3300/products/${id}`);
        setProduct(res.data);
        console.log("✅ Fetched product with ID:", id);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);



  
  if (!product) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border p-5 m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link to="/shop" className="btn btn-secondary mb-4">← Back to Shop</Link>
      <div className="row">
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid p-3 border"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-7">
          <h3>{product.title}</h3>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4 className="text-success">₹{product.price}</h4>
          <p>
            ⭐ {product.rating?.rate ?? "NA"} ({product.rating?.count ?? "N/A"} reviews)
          </p>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
