import React from 'react'
import { Route, Routes } from "react-router-dom";
import StudentMenu from './StudentMenu'
import NavBar from '../NavBar';
import ChangePassword from '../ChangePassword';

const Studenthome = () => {
  return (
    <>
    <NavBar/>
    <div className="flex flex-row h-screen">
      <StudentMenu/>
      <div className="flex-grow p-4 overflow-auto">
          <Routes>
            <Route exact path="changepassword" element={<ChangePassword />} />
          </Routes>
          
        </div>
      </div>
    </>
  )
}

export default Studenthome;

