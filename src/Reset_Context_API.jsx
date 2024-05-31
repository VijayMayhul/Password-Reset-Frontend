//importing createContext to create context api and useState to create state variables
import React, { createContext, useState } from "react";
import axios from "axios"; //importing axios to do CRUD with API
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import { ToastContainer, toast, Bounce } from "react-toastify"; //importing react-toastify to show good UI pop-ups
import "react-toastify/dist/ReactToastify.css"; //importing style for the toast

export const rpContext = createContext(); //creating context api

const Reset_Context_API = ({ children }) => {
  //giving style for the toast
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };

  //defining different toasts
  const notifySuccess = (message) => toast.success(message, toastStyle);
  const notifyError = (message) => toast.error(message, toastStyle);
  const notifyInfo = (message) => toast.info(message, toastStyle);

  const backendUrl = import.meta.env.VITE_BACKEND_URL; //getting backendUrl from .env file
  const navigate = useNavigate(); // Initialize navigate

  //declaring some necessary state variables
  const [token, setToken] = useState(
    () => localStorage.getItem("rpToken") || ""
  );
  const [userData, setUserData] = useState({});

  //setting up the token expiration and token in local storage
  const setTokenWithExpiration = (newToken, expiresIn = 86400) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem("rpToken", newToken);
    localStorage.setItem("rpTokenExpiration", expirationTime);
    setToken(newToken);
  };

  //fetching user data
  const fetchUserData = async (token) => {
    try {
      // Send get request using Axios
      const response = await axios.get(`${backendUrl}user-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.userData);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Failed to fetch user data:", error);
      if (error.response.status === 401) {
        navigate("/login"); //unauthorized user navigate to login page
      }
    }
  };
  return (
    <rpContext.Provider
      value={{
        backendUrl,
        token,
        setToken: setTokenWithExpiration,
        userData,
        setUserData,
        fetchUserData,
        notifySuccess,
        notifyError,
        notifyInfo
      }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </rpContext.Provider>
  );
};

export default Reset_Context_API;
