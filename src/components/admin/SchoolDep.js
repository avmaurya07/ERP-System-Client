import React, { useContext, useState } from "react";
import MainContext from "../../contex/main/maincontext";
import { Link } from "react-router-dom";

const SchoolDep = () => {
  const context = useContext(MainContext);
  const { schoollist, departmentslist, getschoollist, getdepartmentlist } = context;
  const [toggle, setToggle] = useState("");
  const [school, setSchool] = useState("");

  const handleschool = async () => {
    await getschoollist();
    setToggle("school");
  };

  const handledep = async () => {
    await getschoollist();
    setToggle("department");
  };

  const departmentsearch = async () => {
    await getdepartmentlist(school);
  };

  const onschoolChange = (e) => {
    setSchool(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleschool}
        >
          Schools
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handledep}
        >
          Departments
        </button>
      </div>
      
      {toggle === "school" && (
        <div className="overflow-auto max-h-96">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              // to="/admin/registeradmin"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add School
            </Link>
          </div>
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">School Name</th>
                <th className="py-2 px-4 border-b text-left">School Code</th>
              </tr>
            </thead>
            <tbody>
              {schoollist.map((school, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{school.schoolname}</td>
                  <td className="py-2 px-4 border-b">{school.schoolcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {toggle === "department" && (
        <div className="overflow-auto max-h-96">
          <div className="flex items-center space-x-4 mb-4">
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={onschoolChange}
              value={school}
            >
              <option value="">Select a School</option>
              {schoollist.map((school, index) => (
                <option key={index} value={school.schoolcode}>
                  {school.schoolname}
                </option>
              ))}
            </select>
            
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={departmentsearch}
            >
              Search
            </button>

            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search Department"
            />

            <Link
              // to="/admin/registeradmin"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Department
            </Link>
          </div>
          
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Department Name</th>
                <th className="py-2 px-4 border-b text-left">Department Code</th>
              </tr>
            </thead>
            <tbody>
              {departmentslist.map((department, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{department.departmentname}</td>
                  <td className="py-2 px-4 border-b">{department.departmentcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SchoolDep;
