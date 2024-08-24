import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../NavBar";
import CordinatorMenu from "./CordinatorMenu";

const CordinatorHome = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen">
      <CordinatorMenu />
      
      <div className="flex-grow p-4 overflow-auto">
          <Routes>
            {/* <Route exact path="changepassword" element={<ChangePassword />} /> */}
          </Routes>
          
        </div>
        
      
      </div>
    </>
  );
};

export default CordinatorHome;
