import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../contex/alert/alertcontext";

const NavBar = () => {
  const context = useContext(AlertContext);
  const { getuserdata, usertype, UserName, toggleMenuVisibility } = context;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("username");
    navigate("/login"); 
  };
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

          <div
            className="relative navbar-brand ml-[60px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Hello, {UserName}(
            {usertype === "admin" && <>Admin</>}
            {usertype === "student" && <>Student</>}
            {usertype === "teacher" && <>Teacher</>}
            {usertype === "cordinator" && <>Cordinator</>})

            <div className={`absolute bg-white border border-gray-300 mt-2 flex flex-col rounded-lg shadow-lg transition-max-height duration-500 ease-out overflow-hidden ${isHovered ? 'max-h-40 p-4' : 'max-h-0 p-0 border-0'}`}>
              <Link to="/link2" className="text-blue-600 hover:text-blue-800 hover:underline mb-2">Profile</Link>
              <button className="text-red-600 hover:text-red-800 hover:underline" onClick={handleLogout}>
              Logout</button>
            </div>
          </div>
          <div className="navbar-collapse" id="navbarSupportedContent"></div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;