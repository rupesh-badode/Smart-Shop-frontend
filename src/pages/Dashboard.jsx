import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import * as bootstrap from 'bootstrap';

const validationSchema = Yup.object({
  title: Yup.string().required("Product name is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),  
  description: Yup.string().required("Description is required"),
});

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalInstance, setModalInstance] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700 });
    fetchProducts();

    const modalEl = document.getElementById("productModal");
    const instance = new bootstrap.Modal(modalEl);
    setModalInstance(instance);

    modalEl.addEventListener("hidden.bs.modal", () => {
      setSelectedProduct(null);
    });
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("https://smart-shop-backend-5q5i.onrender.com/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    console.log("Deleting product with id:", id);
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`https://smart-shop-backend-5q5i.onrender.com/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error: " + error.response?.data?.message || "Unknown error");
    }
  };


  const handleOpenModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    if (modalInstance) {
      modalInstance.show();
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (modalMode === "add") {
      await axios.post("https://smart-shop-backend-5q5i.onrender.com/addproduct", values);
      alert("product added successfully");
    } else {
      const res = await axios.put(`https://smart-shop-backend-5q5i.onrender.com/${selectedProduct._id}`, values);
      console.log("Update response:", res.data);
      alert("Product updated successfully");
    }
    resetForm();
    if (modalInstance) modalInstance.hide();
    fetchProducts();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 data-aos="fade-right" className="fw-bold">Seller Dashboard</h2>
        <button
          className="btn btn-success rounded shadow"
          onClick={() => handleOpenModal("add")}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Product
        </button>
      </div>
      <div className="table-body">
        <table className="table table-striped table-hover" data-aos="fade-up">
          <thead>
            <tr>
              <th>No.</th>
              <th>Preview</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  {product.image && (
                    <img
                      src={product.image}
                      style={{ width: 50, height: "auto", objectFit: "cover" }}
                      alt="preview"
                    />
                  )}
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td className="d-grid  gap-2">
                  <button className="btn btn-primary " onClick={() => handleOpenModal("edit", product)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <Formik
              initialValues={{
                title: selectedProduct?.title || "",
                price: selectedProduct?.price || "",
                image: selectedProduct?.image || "",
                category: selectedProduct?.category || "",
                description: selectedProduct?.description || ""
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold" id="productModalLabel">
                      {modalMode === "add" ? "Add Product" : "Update Product"}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Product Name</label>
                      <Field name="title" className="form-control" />
                      {errors.title && touched.title && <div className="text-danger small">{errors.title}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price(₹)</label>
                      <Field name="price" type="number" className="form-control" />
                      {errors.price && touched.price && <div className="text-danger small">{errors.price}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Product Image</label>
                      <Field name="image" type="text" className="form-control mb-2" placeholder="Paste image URL" />
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFieldValue("image", reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {errors.image && touched.image && <div className="text-danger small">{errors.image}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <Field name="category" type="text" className="form-control" />
                      {errors.category && touched.category && <div className="text-danger small">{errors.category}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <Field name="description" className="form-control" />
                      {errors.description && touched.description && <div className="text-danger small">{errors.description}</div>}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {modalMode === "add" ? "Add Product" : "Update Product"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}