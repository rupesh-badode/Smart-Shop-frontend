import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export default function Register(){
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Too short').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://127.0.0.1:3300/newseller', values);
      setSubmitted(true);
      resetForm();
    } catch {
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="container py-5 min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow w-100" style={{ maxWidth: '450px' }} data-aos="zoom-in-up">
        <h3 className="text-center mb-4" data-aos="fade-down">
          <i className="bi bi-person-plus-fill me-2"></i>Sign Up
        </h3>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              {/* Name */}
              <div className="form-floating mb-3" data-aos="fade-right">
                <Field
                  name="name"
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="Your Name"
                />
                <label htmlFor="floatingName">
                  <i className="bi bi-person-circle me-2"></i>Your Name
                </label>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="name" />
                </div>
              </div>

              {/* Email */}
              <div className="form-floating mb-3" data-aos="fade-left">
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Your Email"
                />
                <label htmlFor="floatingEmail">
                  <i className="bi bi-envelope-at-fill me-2"></i>Your Email
                </label>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Password */}
              <div className="form-floating mb-3" data-aos="fade-right">
                <div className="input-group">
                  <Field
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPass(!showPass)}
                  >
                    <i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                  </button>
                </div>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="password" />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-floating mb-3" data-aos="fade-left">
                <div className="input-group">
                  <Field
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    className="form-control"
                    id="floatingConfirm"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <i className={`bi ${showConfirm ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                  </button>
                </div>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid mt-3" data-aos="flip-up">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-circle me-2"></i>Register
                </button>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="alert alert-success mt-3" role="alert" data-aos="fade">
                  <i className="bi bi-check-circle-fill me-2"></i>Registration successful!
                </div>
              )}
            </Form>
          )}
        </Formik>
        <Link to="/login">Already have a Account ?</Link>
      </div>
    </div>
  );
};

