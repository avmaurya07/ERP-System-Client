import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BatchContext from "../../contex/batch/batchcontext";
import MainContext from "../../contex/main/maincontext";

const Courses = () => {
  const navigate = useNavigate();
  const context = useContext(BatchContext);
  const { courselist, getcourselist, addcourse, setCourselist } = context;
  const context1 = useContext(MainContext);
  const {
    selectedRoles,
    schoollist,
    departmentslist,
    getschoollist,
    getdepartmentlist,
  } = context1;

  const [toggleadmin, setToggleadmin] = useState(true);
  const [courseData, setCourseData] = useState({
    coursename: "",
    coursecode: "",
    academicyear: "",
    semester: "",
    schoolcode:"",
    departmentcode:"",
  });
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [rdata, setRdata] = useState({
    school: "",
    department: "",
  });
  const [modalYear, setModalYear] = useState("");
  const [modalSem, setModalSem] = useState("");
  const [modalSemList, setModalSemList] = useState([]);

  useEffect(() => {
    getschoollist();
    checkPermission();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("usertype") === "cordinator") {
      getcourselist();
      setToggleadmin(false);
    } else if (localStorage.getItem("usertype") === "admin") {
      setCourselist([]);
    }
  }, []);

  const checkPermission = () => {
    if (localStorage.getItem("usertype") === "cordinator" && !selectedRoles.studentcontrol) {
      return navigate("/cordinator");
    }
  };

  const ondepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setRdata((prevData) => ({
      ...prevData,
      department: selectedDepartment,
    }));
    setDepartment(selectedDepartment);
  };

  const onInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    await addcourse(courseData);
    setCourseData({
      coursename: "",
      coursecode: "",
      academicyear: "",
      semester: "",
    });
    getcourselist("", rdata.school, rdata.department);
  };

  const onschoolChange = (e) => {
    const selectedSchool = e.target.value;
    setRdata((prevData) => ({
      ...prevData,
      school: selectedSchool,
    }));
    setSchool(selectedSchool);
    getdepartmentlist(selectedSchool);
  };

  const handlesubmit = () => {
    getcourselist("", rdata.school, rdata.department);
    setCourseData({schoolcode:rdata.school,departmentcode:rdata.department,})
    setToggleadmin(false);
  };

  return (
    <div className="p-4">
      {toggleadmin && (
        <>
          <div>
            <label htmlFor="school" className="block text-sm font-medium leading-6 text-gray-900">
              School
            </label>
            <div className="mt-2">
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
            </div>
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
              Department
            </label>
            <div className="mt-2">
              <select
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={ondepartmentChange}
                value={department}
              >
                <option value="">Select a Department</option>
                {departmentslist.map((department, index) => (
                  <option key={index} value={department.departmentcode}>
                    {department.departmentname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 my-2 rounded hover:bg-blue-700"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}

      {!toggleadmin && (
        <>
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold">Courses</h1>
            <button
              type="button"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              data-bs-toggle="modal"
              data-bs-target="#addcourseModal"
            >
              Add New Course
            </button>
          </div>

          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Course Name</th>
                  <th className="py-2 px-4 border-b text-left">Course Code</th>
                </tr>
              </thead>
              <tbody>
                {courselist.map((course, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{course.coursename}</td>
                    <td className="py-2 px-4 border-b">{course.coursecode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Course Modal */}
          <div
            className="modal fade"
            id="addcourseModal"
            tabIndex="-1"
            aria-labelledby="addcourseModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addcourseModalLabel">
                    Add New Course
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="coursename" className="form-label">
                        Course Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="coursename"
                        name="coursename"
                        onChange={onInputChange}
                        value={courseData.coursename}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="coursecode" className="form-label">
                        Course Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="coursecode"
                        name="coursecode"
                        onChange={onInputChange}
                        value={courseData.coursecode}
                        required
                      />
                    </div>
                    {/* Optionally add academic year and semester fields if needed */}
                    {/* <div className="mb-3">
                      <label htmlFor="academicyear" className="form-label">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="academicyear"
                        name="academicyear"
                        onChange={onInputChange}
                        value={courseData.academicyear}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="semester" className="form-label">
                        Semester
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="semester"
                        name="semester"
                        onChange={onInputChange}
                        value={courseData.semester}
                      />
                    </div> */}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddCourse}
                    data-bs-dismiss="modal"
                  >
                    Add Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
