import { ErrorMessage, Field, Form, Formik } from "formik";
//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react"; //importing formik tags to perform form operations
import { rpContext } from "../Reset_Context_API"; //imporing rpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import * as Yup from "yup"; //importing Yup to create validation schema
import axios from "axios"; //importing axios to do CRUD with API

const ResetPassword = () => {
  //getting necessary things from context API
  const { backendUrl, notifySuccess, notifyError } = useContext(rpContext);

  //spinning effect state
  const [loadSpinner, setLoadSpinner] = useState(false);

  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //declating initial values for form fields
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
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
    confirmPassword: Yup.string()
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

  //Handling forgot password form submission
  const handleResetPassword = async (values) => {
    try {
      setLoadSpinner(true);

      // Extract token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      // Send Put request using Axios
      const response = await axios.put(
        `${backendUrl}reset-password?token=${token}`,
        values
      );

      // Log the response from the server
      console.log(response.data.message);
      notifySuccess(response.data.message);
      navigate("/login");
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
                <div className="card-body pb-4 px-md-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleResetPassword}
                  >
                    <Form className="mb-2">
                      <h3 className="text-center text-success fw-bold">
                        Reset Password
                      </h3>
                      <p className="text-center">
                        You can reset your password here.
                      </p>
                      <div className="row">
                        <div className="my-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>New Password : </b>
                          </label>
                          <Field
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter your New Password"
                          />
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <div className="my-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Confirm Password : </b>
                          </label>
                          <Field
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Enter your New Password again"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
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
                              <span>Reset Password</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
