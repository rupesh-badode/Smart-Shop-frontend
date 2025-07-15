import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AOS from "aos";
import {useNavigate } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post("http://127.0.0.1:3300/login", values)
      .then(response => {
        alert("Login Successful!");
        resetForm();
        const {role,user} = response.data;

        localStorage.setItem("role",role);
        localStorage.setItem("user", JSON.stringify(user));

        if(role=="seller") {
          navigate("/dashboard");
        }else{
          navigate("/home");
        }
      })
      .catch(error => {
        alert("Login Failed!",error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow rounded-4" data-aos="fade-up" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4"><i className="bi bi-person-circle me-2"></i>Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        
      </div>
    </div>
  );
}
