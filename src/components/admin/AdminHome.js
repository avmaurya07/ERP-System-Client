import React from "react";
import AdminMenu from "./AdminMenu";
import NavBar from "../NavBar";
import { Route, Routes } from "react-router-dom";
import RegisterStudent from "./RegisterStudent";
import RegisterAdmin from "./RegisterAdmin";
import RegisterTeacher from "./RegisterTeacher";
import ChangePassword from "../ChangePassword";
import UserList from "./userlist";

const AdminHome = () => {
  return (
    <>
      <NavBar />

      <div className="flex flex-row h-screen">
        <AdminMenu />
        <div className="flex-grow p-4 overflow-auto">
          <Routes>
            <Route exact path="registeradmin" element={<RegisterAdmin/>} />
            <Route exact path="users" element={<UserList/>} />
            <Route exact path="registerteacher" element={<RegisterTeacher  />} />
            <Route exact path="registerstudent" element={<RegisterStudent />} />
            <Route exact path="changepassword" element={<ChangePassword />} />
          </Routes>
          
        </div>
      </div>
    </>
  );
};

export default AdminHome;
