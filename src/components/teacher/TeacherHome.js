import React from "react";
import { Route, Routes } from "react-router-dom";
import TeacherMenu from "./TeacherMenu";
import NavBar from "../NavBar";
import ChangePassword from "../ChangePassword";

const TeacherHome = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen mt-5">
      <TeacherMenu />
      
      <div className="flex-grow p-4 overflow-auto">
          <Routes>
            <Route exact path="changepassword" element={<ChangePassword />} />
          </Routes>
          
        </div>
        
      
      </div>
    </>
  );
};

export default TeacherHome;
