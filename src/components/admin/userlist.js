import React, { useContext, useState } from "react";
import UserListContext from "../../contex/userlist/userlistcontext";
import { Link, useNavigate } from "react-router-dom";
import RegisterContext from "../../contex/register/registercontext";

const UserList = () => {
  const navigate = useNavigate();
  const context = useContext(UserListContext);
  const { userlist, fetchuserlist, setUserlist, masterlogin } = context;
  const context1 = useContext(RegisterContext);
  const { register } = context1;
  const [usertype, setUsertype] = useState(""); 
  const [userId, setUserId] = useState("");

  const onmakecordinator = async (user) => {
    const cordinatorData = {
      empid: user.empid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      school: user.school,
      department: user.department,
      usertype: "cordinator",
    };
    await register(cordinatorData);
  };

  const onUsertypeChange = (e) => {
    setUsertype(e.target.value);
    setUserlist([]); // Clear user list when type changes
  };

  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchuserlist(usertype, userId); // Assuming fetchuserlist accepts usertype and userId
  };

  const filteredUserList = userlist.filter(user => {
    if (usertype === "teacher" && user.empid) {
      return user.empid.includes(userId);
    }
    if (usertype === "student" && user.systemid) {
      return user.systemid.includes(userId);
    }
    if (usertype === "admin" && user.email) {
      return user.email.includes(userId);
    }
    if (usertype === "cordinator" && user.empid) {
      return user.empid.includes(userId);
    }
    return false;
  });

  const handleMasterLogin = async (user) => {
    const json = await masterlogin(user);
    if (json.usertype === "student") {
      navigate("/student");
    }
    if (json.usertype === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search User Details</h1>

      <div className="flex items-center space-x-4 mb-4">
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onUsertypeChange}
          value={usertype}
        >
          <option value="">Select</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="cordinator">Cordinator</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          Search
        </button>
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search User"
          value={userId}
          onChange={onUserIdChange}
        />
        <Link
          to="/admin/registeradmin"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Admin
        </Link>
        <Link
          to="/admin/registerstudent"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Student
        </Link>
        <Link
          to="/admin/registerteacher"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Teacher
        </Link>
      </div>

      <div className="overflow-auto max-h-96">
        <table className="min-w-full bg-white border table-auto">
          <thead>
            <tr>
              {usertype === "teacher" || usertype === "cordinator" ? (
                <th className="py-2 px-4 border-b text-left">Employee Id</th>
              ) : null}
              {usertype === "student" && (
                <th className="py-2 px-4 border-b text-left">System Id</th>
              )}
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              {(usertype === "teacher" || usertype === "student" || usertype === "cordinator") && (
                <>
                  <th className="py-2 px-4 border-b text-left">School</th>
                  <th className="py-2 px-4 border-b text-left">Department</th>
                </>
              )}
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserList.map((user, index) => (
              <tr key={index}>
                {usertype === "teacher" || usertype === "cordinator" ? (
                  <td className="py-2 px-4 border-b">{user.empid}</td>
                ) : null}
                {usertype === "student" && (
                  <td className="py-2 px-4 border-b">{user.systemid}</td>
                )}
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                {(usertype === "teacher" || usertype === "student" || usertype === "cordinator") && (
                  <>
                    <td className="py-2 px-4 border-b">{user.school}</td>
                    <td className="py-2 px-4 border-b">{user.department}</td>
                  </>
                )}
                <td className="py-2 px-4 border-b flex space-x-2">
                  {(usertype === "teacher"  || usertype === "student") && (
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                      onClick={() => handleMasterLogin(user)}
                    >
                      Login
                    </button>
                  )}
                  {usertype === "teacher" && (
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                      onClick={() => onmakecordinator(user)}
                    >
                      Make Cordinator
                    </button>
                  )}
                  {usertype === "cordinator" && (
                    <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700">
                      Roles
                    </button>
                  )}
                  <Link
                    to="/admin/logs"
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Logs
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
