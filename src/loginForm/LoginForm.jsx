import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from '../assets/company-logo.svg';


// Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      const mockUser = {
        email: "tunatest@example.com",
        password: "tunatech@07",
        token: "userInfo",
      };

      if (values.email === mockUser.email && values.password === mockUser.password) {
        login(mockUser.token);
        navigate('/')

      } else {
        alert("Incorrect credentials");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="container mt-5 shadow-sm p-4" style={{ maxWidth: "400px" }}>
        <div className="d-flex justify-content-center"
        >
          <a href="https://stlnpl.com" target="_blank" rel="noreferrer" className="d-flex justify-content-center">
            <img src={logo} className="w-25"
              style={{ cursor: ' pointer' }}
            >
            </img>
          </a>

        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate >
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              {/* Password with show/hide */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control "
                    id="password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default LoginForm;
