import React, { lazy, Suspense } from "react"; //importing lazy, suspense for lazy loading
import { BrowserRouter, Route, Routes } from "react-router-dom"; //importing react-router-dom tags for routing
import "./App.css"; //importing style sheet

//importing bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

//importing Context API
import Reset_Context_API from "./Reset_Context_API";

//imporing all child components for routing purpose
import Register from "./Login_Components/Register";
import ForgotPassword from "./Login_Components/ForgotPassword";
import Page_Not_Found from "./Main_Components/Page_Not_Found";
import User from "./Main_Components/User";
import Loading from "./Main_Components/Loading";
import ResetPassword from "./Login_Components/ResetPassword";

// Lazy loaded components
const Home = lazy(() =>
  import("./Main_Components/Home").then((module) =>
    delay(2000).then(() => module)
  )
);

const Login = lazy(() =>
  import("./Login_Components/Login").then((module) =>
    delay(1000).then(() => module)
  )
);

//manual delay time
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  return (
    <BrowserRouter>
      <Reset_Context_API>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/user" element={<User />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="*" element={<Page_Not_Found />} />
          </Routes>
        </Suspense>
      </Reset_Context_API>
    </BrowserRouter>
  );
}

export default App;
