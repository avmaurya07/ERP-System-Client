import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../contex/alert/alertcontext";

const NavBar = () => {
  const context = useContext(AlertContext);
  const { getuserdata, usertype, UserName, toggleMenuVisibility } = context;
  useEffect(() => {
    getuserdata();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white z-30 fixed-top">
        <div className="container-fluid">
          <span
            className="fixed top-0 left-0 block bg-neutral-600 h-[55px] w-[60px] my-0 mr-[20px] text-[26px] text-white text-center leading-[55px] cursor-pointer"
            onClick={toggleMenuVisibility}
          >
            ☰
          </span>

          <Link className="navbar-brand ml-[60px]">
            Hello, {UserName}({usertype === "admin" && <>Admin</>}
            {usertype === "student" && <>Student</>}
            {usertype === "teacher" && <>Teacher</>}
            {usertype === "cordinator" && <>Cordinator</>})
          </Link>
          <div className="navbar-collapse" id="navbarSupportedContent"></div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
