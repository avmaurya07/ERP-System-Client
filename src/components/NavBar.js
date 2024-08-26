import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import AlertContext from "../contex/alert/alertcontext";

const NavBar = () => {
  const context = useContext(AlertContext);
  const { getuserdata,usertype,UserName } = context;
  useEffect(() => {
    getuserdata();
  }, [getuserdata]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Hello, {UserName}({usertype === "admin" && <>Admin</>}
            {usertype === "student" && <>Student</>}
            {usertype === "teacher" && <>Teacher</>}
            {usertype === "cordinator" && <>Cordinator</>})
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse" id="navbarSupportedContent">
           
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
