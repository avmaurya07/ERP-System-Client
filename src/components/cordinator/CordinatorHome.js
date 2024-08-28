import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../NavBar";
import CordinatorMenu from "./CordinatorMenu";
import Batches from "./Batches";
import EditBatch from "./EditBatch";
import Courses from "./Courses";
import Classes from "./Classes";

const CordinatorHome = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen mt-5">
      <CordinatorMenu />
      
      <div className="flex-grow p-4 overflow-auto">
          <Routes>
            <Route exact path="batches" element={<Batches />} />
            <Route exact path="courses" element={<Courses />} />
            <Route exact path="classes" element={<Classes />} />
            <Route path="/batches/editstudents" element={<EditBatch />} />
          </Routes>
          
        </div>
        
      
      </div>
    </>
  );
};

export default CordinatorHome;
