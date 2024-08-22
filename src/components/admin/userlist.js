import React, { useContext, useState } from "react";
import UserListContext from "../../contex/userlist/userlistcontext";

const UserList = () => {
  const context = useContext(UserListContext);
  const [usertype, setUsertype] = useState("admin");
  const { userlist, fetchuserlist, setUserlist } = context;
  const onChange = (e) => {
    setUsertype(e.target.value);
    setUserlist([]);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchuserlist(usertype);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        List of Users in Different Categories
      </h1>

      <div className="flex items-center space-x-4 mb-4">
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onChange}
          value={usertype}
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="overflow-auto max-h-96">
        {" "}
        {/* Scrollable container */}
        <table className="min-w-full bg-white border table-auto">
          {" "}
          {/* Added table-auto class */}
          <thead>
            <tr>
              {usertype === "teacher" && (
                <th className="py-2 px-4 border-b text-left">Employee Id</th>
              )}
              {usertype === "student" && (
                <th className="py-2 px-4 border-b text-left">System Id</th>
              )}
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              {(usertype === "teacher" || usertype === "student") && (
                <th className="py-2 px-4 border-b text-left">School</th>
              )}
              {(usertype === "teacher" || usertype === "student") && (
                <th className="py-2 px-4 border-b text-left">Department</th>
              )}
            </tr>
          </thead>
          <tbody>
            {userlist.map((user, index) => (
              <tr key={index}>
                {(usertype==="teacher") && <td className="py-2 px-4 border-b">{user.empid}</td>}
                {(usertype==="student") && <td className="py-2 px-4 border-b">{user.systemid}</td>}
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                {(usertype==="teacher" || usertype==="student") && <td className="py-2 px-4 border-b">{user.school}</td>}
                {(usertype==="teacher" || usertype==="student") && <td className="py-2 px-4 border-b">{user.department}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
