import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TeacherMenu from "./TeacherMenu";
import NavBar from "../NavBar";
import ChangePassword from "../ChangePassword";
import Batches from "./Batches";
import Card from "../admin/Card";
import Timetable from "./Timetable";

const TeacherHome = () => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen mt-5">
      <TeacherMenu />
      <div className="flex-grow p-4 overflow-auto">
      {location.pathname === "/teacher" && (
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Card title="Timetable" link="timetable" />
                <Card title="Batches" link="batches" />
              </div>
            </div>
          )}
      <div className="flex-grow p-4 overflow-auto mr-2">
          <Routes>
            <Route exact path="changepassword" element={<ChangePassword />} />
            <Route exact path="batches" element={<Batches />} />
            <Route exact path="timetable" element={<Timetable />} />
          </Routes>
          
        </div>
        </div>
      
      </div>
    </>
  );
};

export default TeacherHome;
