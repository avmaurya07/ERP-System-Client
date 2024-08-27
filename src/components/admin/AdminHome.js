import React from "react";
import AdminMenu from "./AdminMenu";
import NavBar from "../NavBar";
import { Route, Routes } from "react-router-dom";
import RegisterStudent from "./RegisterStudent";
import RegisterAdmin from "./RegisterAdmin";
import RegisterTeacher from "./RegisterTeacher";
import ChangePassword from "../ChangePassword";
import UserList from "./userlist";
import SchoolDep from "./SchoolDep";
import Logs from "../Logs";
import YearSem from "./YearSem";
import Batches from "../cordinator/Batches";
import EditBatch from "../cordinator/EditBatch";
import Courses from "../cordinator/Courses";

const AdminHome = () => {
  return (
    <>
      <NavBar />

      <div className="flex flex-row h-screen mt-5">
        <AdminMenu />
        <div className="flex-grow p-4 overflow-auto">
          <Routes>
            <Route exact path="registeradmin" element={<RegisterAdmin/>} />
            <Route exact path="users" element={<UserList/>} />
            <Route exact path="registerteacher" element={<RegisterTeacher  />} />
            <Route exact path="registerstudent" element={<RegisterStudent />} />
            <Route exact path="changepassword" element={<ChangePassword />} />
            <Route exact path="schooldep" element={<SchoolDep />} />
            <Route exact path="yearsem" element={<YearSem />} />
            <Route exact path="logs" element={<Logs />} />
            <Route exact path="batches" element={<Batches />} />
            <Route exact path="courses" element={<Courses />} />
            <Route exact path="batches/editstudents" element={<EditBatch />} />
          </Routes>
          
        </div>
      </div>
    </>
  );
};

export default AdminHome;
