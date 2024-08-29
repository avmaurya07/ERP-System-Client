import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import NavBar from "../NavBar";
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
import Classes from "../cordinator/Classes";
import Card from "./Card"; 

const AdminHome = () => {
  const location = useLocation();

  return (
    <>
      <NavBar />

      <div className="flex flex-row h-screen mt-5">
        <AdminMenu />
        <div className="flex-grow p-4 overflow-auto">
          {location.pathname === "/admin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card title="User List" description="View all users" link="users" />
              <Card title="Change Password" description="Change your password" link="changepassword" />
              <Card title="School & Department" description="Manage school and department" link="schooldep" />
              <Card title="Academic Year & Semester" description="Manage academic year and semester" link="yearsem" />
              <Card title="Batches" description="Manage batches" link="batches" />
              <Card title="Courses" description="Manage courses" link="courses" />
              <Card title="Classes" description="Manage classes" link="classes" />
            </div>
          )}
          <Routes>
            <Route exact path="registeradmin" element={<RegisterAdmin />} />
            <Route exact path="users" element={<UserList />} />
            <Route exact path="changepassword" element={<ChangePassword />} />
            <Route exact path="registerteacher" element={<RegisterTeacher />} />
            <Route exact path="registerstudent" element={<RegisterStudent />} />
            <Route exact path="schooldep" element={<SchoolDep />} />
            <Route exact path="yearsem" element={<YearSem />} />
            <Route exact path="logs" element={<Logs />} />
            <Route exact path="batches" element={<Batches />} />
            <Route exact path="courses" element={<Courses />} />
            <Route exact path="classes" element={<Classes />} />
            <Route exact path="batches/editstudents" element={<EditBatch />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminHome;