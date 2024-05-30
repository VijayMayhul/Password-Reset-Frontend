//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";
import { rpContext } from "../Reset_Context_API"; //imporing rpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import "./Main.css"; //importing style sheet
import Page_Not_Found from "./Page_Not_Found"; //importing Page not found component

const Home = () => {
  //getting necessary things from context API
  const { userData, setToken } = useContext(rpContext);
  const navigate = useNavigate();

  // Retrieve token from localStorage on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem("rpToken");
    const storedTokenExpiration = localStorage.getItem("rpTokenExpiration");

    if (storedToken && new Date().getTime() < storedTokenExpiration) {
      setToken(storedToken);
    } else {
      navigate("/page-not-found");
    }
  }, [setToken, navigate]);

  return (
    <>
      {userData ? (
        <section>
          <div className="container vh-100">
            <div className="row d-flex justify-content-center align-items-center h-75">
              <h1 className="h1 text-primary d-flex justify-content-center">
                
                <div className="welcome-txt px-3 py-2 bg-white w-lg-50 text-center">Welcome {userData.firstName} {userData.lastName}</div>
              </h1>
            </div>
          </div>
        </section>
      ) : (
        <Page_Not_Found />
      )}
    </>
  );
};

export default Home;
