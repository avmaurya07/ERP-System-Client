import React from "react";
import { Route, Routes } from "react-router-dom";
import TeacherMenu from "./TeacherMenu";
import NavBar from "../NavBar";
import ChangePassword from "../ChangePassword";

const TeacherHome = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
      <TeacherMenu />
      
      <div className="flex-grow">
          <Routes>
            <Route exact path="changepassword" element={<ChangePassword />} />
          </Routes>
          
        </div>
      
      </div>
    </>
  );
};

export default TeacherHome;
