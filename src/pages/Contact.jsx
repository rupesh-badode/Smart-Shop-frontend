import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AOS from 'aos';
import emailjs from 'emailjs-com';
import 'aos/dist/aos.css';

const ContactForm = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const initialValues = {
    user_name: '',
    user_email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().min(3, 'Too short').required('Required'),
    user_email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().min(10, 'Too short').required('Required'),
  });

  const sendEmail = async (values, { resetForm }) => {
    setSending(true);
    try {
      await emailjs.send(
        'your_service_id',
        'your_template_id',
        values,
        'your_public_key'
      );
      setSent(true);
      resetForm();
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container py-5" id="contact">
      <h2 className="text-center mb-4" data-aos="fade-down">
        <i className="bi bi-chat-dots me-2"></i>Get in Touch
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-8" data-aos="zoom-in-up">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendEmail}
          >
            <Form ref={formRef} className="p-4 border rounded shadow bg-light">
              {/* Name Field */}
              <div className="form-floating mb-3" data-aos="fade-right">
                <Field
                  name="user_name"
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="Your Name"
                />
                <label htmlFor="floatingName">
                  <i className="bi bi-person-circle me-2"></i>Your Name
                </label>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="user_name" />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-floating mb-3" data-aos="fade-left">
                <Field
                  name="user_email"
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Your Email"
                />
                <label htmlFor="floatingEmail">
                  <i className="bi bi-envelope-at-fill me-2"></i>Your Email
                </label>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="user_email" />
                </div>
              </div>

              {/* Message Field */}
              <div className="form-floating mb-3" data-aos="fade-up">
                <Field
                  as="textarea"
                  name="message"
                  className="form-control"
                  id="floatingMessage"
                  placeholder="Your Message"
                  style={{ height: '150px' }}
                />
                <label htmlFor="floatingMessage">
                  <i className="bi bi-chat-left-text me-2"></i>Your Message
                </label>
                <div className="text-danger small mt-1">
                  <ErrorMessage name="message" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid" data-aos="flip-up">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2"></i>Send Message
                    </>
                  )}
                </button>
              </div>

              {/* Success Alert */}
              {sent && (
                <div className="alert alert-success mt-3" role="alert" data-aos="fade">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Message sent successfully!
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
