import React, { useContext, useEffect, useState } from "react";
import BatchContext from "../../contex/batch/batchcontext";
import MainContext from "../../contex/main/maincontext";
import { useNavigate } from "react-router-dom";
import UserListContext from "../../contex/userlist/userlistcontext";

const EditBatch = () => {
  const navigate = useNavigate();
  const context = useContext(BatchContext);
  const { selectedBatch } = context;
  const context1 = useContext(MainContext);
  const { selectedRoles } = context1;
  const context2 = useContext(UserListContext);
  const { userlist, fetchuserlist} = context2;
  const [toggleview, setToggleview] = useState("page");
  const [userId, setUserId] = useState("");
  const checkPermission = () => {
    if (localStorage.getItem("usertype")==="cordinator"){if (!selectedRoles.studentcontrol) {
      navigate("/cordinator");
    }}
  };
  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };
  const handleEditStudents = () => {
    setToggleview("edit");
    fetchuserlist("student")
  };
  const handleback = () => {
    setToggleview("page");
  };
  const filteredUserList = userlist.filter((user) => {
    return (user.systemid?.includes(userId) &&
    user.school?.includes(selectedBatch.schoolcode) &&
    user.department?.includes(selectedBatch.departmentcode)
    )
  });
  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <>
      {toggleview === "page" && (
        <>
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border table-auto shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">
                    Batch Information
                  </th>
                  <th className="py-2 px-4 border-b text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <strong>School:</strong>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedBatch.schoolcode}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <strong>Department:</strong>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedBatch.departmentcode}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <strong>Academic Year:</strong>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedBatch.academicyearcode}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <strong>Semester:</strong>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedBatch.semestercode}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <strong>Batch:</strong>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {selectedBatch.batchname}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-auto max-h-96 mt-10">
            <button
              className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-700"
              onClick={handleEditStudents}
            >
              Edit
            </button>
            <table className="min-w-full bg-white border table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">System ID</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch.students.map((student, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{student.name}</td>
                    <td className="py-2 px-4 border-b">{student.systemid}</td>
                    <td className="py-2 px-4 border-b">{student.email}</td>
                    <td className="py-2 px-4 border-b">{student.phone}</td>
                    <td className="py-2 px-4 border-b"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}




      {toggleview === "edit" && (
        <div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search User Details</h1>

            <div className="flex items-center space-x-4 mb-4">
              <button
                className="bg-yellow-500 text-white font-bold py-1 px-3 rounded hover:bg-yellow-700"
                onClick={handleback}
              >
                Back
              </button>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search User"
                value={userId}
                onChange={onUserIdChange}
              />
            </div>

            <div className="overflow-auto max-h-96">
              <table className="min-w-full bg-white border table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left"></th>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">System ID</th>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-2 px-4 text-center">
                        No matching user found.
                      </td>
                    </tr>
                  ) : (
                    filteredUserList.map((user) => (
                      <tr key={user.systemid}>
                        <td className="py-2 px-4 border-b"><input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"/></td>
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">{user.systemid}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.phone}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBatch;
