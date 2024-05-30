import React, { useContext } from "react"; //importing useContext to use context api
import { NavLink } from "react-router-dom"; //importing NavLink for manual navigation
import "./Main.css"; //importing style sheet
import { rpContext } from "../Reset_Context_API"; //imporing rpContext

//pageNotFound Component
const Page_Not_Found = () => {
  //getting necessary things from context API
  const { token } = useContext(rpContext);

  return (
    <div className="pageNotFound">
      {token ? (
        <>
          <h1 className="display-4">Error : 404</h1>
          <p className="lead">Page Not Found</p>
          <NavLink to="/user" className="btn btn-primary">
            Go to home
          </NavLink>
        </>
      ) : (
        <>
          <h1 className="display-4">Error : 401</h1>
          <p className="lead">User Not Found</p>
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Page_Not_Found;
