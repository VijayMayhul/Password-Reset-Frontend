import { ErrorMessage, Field, Form, Formik } from "formik"; //importing formik tags to perform form operations
//importing useContext to use context api and useState to create state variables
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import * as Yup from "yup"; //importing Yup to create validation schema
import axios from "axios"; //importing axios to do CRUD with API
import { rpContext } from "../Reset_Context_API"; //imporing rpContext

const Register = () => {
  //getting necessary things from context API
  const { backendUrl, notifySuccess, notifyError } = useContext(rpContext);

  //spinning effect state
  const [loadSpinner, setLoadSpinner] = useState(false);

  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //declating initial values for form fields
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the present or future")
      .required("Date of Birth is required"),
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

  //Handling register form submission
  const handleRegister = async (values) => {
    try {
      setLoadSpinner(true);

      // Convert the dateOfBirth to YYYY-MM-DD format
      values.dateOfBirth = new Date(values.dateOfBirth)
        .toISOString()
        .split("T")[0];

      // Send POST request using Axios
      const response = await axios.post(`${backendUrl}register-user`, values);

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
            <div className="col-lg-6 col-md-10">
              <div className="card bg-body-tertiary shadow-2-strong">
                <div className="card-body py-4 px-md-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                  >
                    <Form className="mb-2">
                      <h3 className="text-center text-warning fw-bold mb-2">
                        Register
                      </h3>
                      <div className="row">
                        <div className="my-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>First Name : </b>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="Enter Your Name"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <div className="mb-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Last Name : </b>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="Enter Your Name"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <div className="mb-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Date of Birth : </b>
                          </label>
                          <Field
                            type="Date"
                            className="form-control"
                            name="dateOfBirth"
                          />
                          <ErrorMessage
                            name="dateOfBirth"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <div className="mb-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Email : </b>
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
                        <div className="mb-5 col-sm-12 col-lg-12">
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
                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-info w-100 fw-bold"
                          >
                            {loadSpinner ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></span>
                            ) : (
                              <span>Register</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                  <p className="mb-0 mt-4 text-center">
                    Already have an account?{" "}
                    <NavLink to={"/login"} className="text-primary fw-bold">
                      Login
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

export default Register;
