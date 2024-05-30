//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import { ErrorMessage, Field, Form, Formik } from "formik"; //importing formik tags to perform form operations
import * as Yup from "yup"; //importing Yup to create validation schema
import axios from "axios"; //importing axios to do CRUD with API
import { rpContext } from "../Reset_Context_API"; //imporing rpContext

const Login = () => {
  //getting necessary things from context API
  const { backendUrl, setToken, notifySuccess, notifyError } =
    useContext(rpContext);

  //spinning effect state
  const [loadSpinner, setLoadSpinner] = useState(false);

  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //declating initial values for form fields
  const initialValues = {
    email: "",
    password: "",
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one of the following special characters: !@#$%^&*(),.?":{}|<>'
      )
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  //Handling login form submission
  const handleLogin = async (values) => {
    try {
      setLoadSpinner(true);

      // Send POST request using Axios
      const response = await axios.post(`${backendUrl}login-user`, values);

      // Assuming the token expiration time comes from the response, or set it manually
      const expiresIn = response.data.expiresIn || 86400; // 24 hours in seconds

      // Log the response from the server
      console.log(response.data.message);

      // Ensure expiresIn is a valid number
      if (isNaN(expiresIn)) {
        throw new Error("Invalid expiresIn value");
      }

      setToken(response.data.token, expiresIn);
      notifySuccess(response.data.message);
      navigate("/user");
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      notifyError(`${error.response.data.error}`);
    } finally {
      setLoadSpinner(false);
    }
  };
  return (
    <>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-6">
              <div className="card bg-body-tertiary shadow-2-strong">
                <div className="card-body py-4 px-md-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    <Form className="mb-2">
                      <h3 className="text-center text-primary fw-bold mb-2">
                        Login
                      </h3>
                      <div className="row">
                        <div className="my-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Email Address : </b>
                          </label>
                          <Field
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="e.g : example123@gmail.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <div className="mb-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Password : </b>
                          </label>
                          <Field
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="e.g : Password@123"
                          />
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <p className="text-center">
                          <NavLink
                            to="/forgot-password"
                            className={
                              "text-decoration-none text-warning fw-bold"
                            }
                          >
                            Forgot Password?
                          </NavLink>
                        </p>
                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary w-100 fw-bold"
                          >
                            {loadSpinner ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></span>
                            ) : (
                              <span>Login</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                  <p className="mb-0 mt-4 text-center">
                    Don't have an account?{" "}
                    <NavLink to={"/register"} className="text-success fw-bold">
                      Register
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
