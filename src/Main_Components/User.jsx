//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom"; //importing outlet
import Navbar from "./Navbar"; //importing navbar component
import Footer from "./Footer"; //importing Footer component
import "./Main.css"; //importing style sheet
import { rpContext } from "../Reset_Context_API"; //imporing rpContext

const User = () => {
  //getting necessary things from context API
  const { token, fetchUserData } = useContext(rpContext);

  //fetching user data
  useEffect(() => {
    if (token) {
      localStorage.setItem("rpToken", token);
      fetchUserData(token);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default User;
