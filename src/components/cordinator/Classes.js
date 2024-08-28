import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BatchContext from "../../contex/batch/batchcontext";
import MainContext from "../../contex/main/maincontext";
import AlertContext from "../../contex/alert/alertcontext";

const Batches = () => {
  const navigate = useNavigate();
  const context = useContext(BatchContext);
  const { batchlist, getbatchlist, addbatch, setSelectedBatch, setBatchlist, setStudents } = context;
  const context2 = useContext(AlertContext);
  const {setMenuVisible} = context2;
  
  const context1 = useContext(MainContext);
  const {
    yearlist,
    getyearlist,
    getsemlist,
    selectedRoles,
    schoollist,
    departmentslist,
    getschoollist,
    getdepartmentlist,
  } = context1;

  const [modalYear, setModalYear] = useState("");
  const [modalSem, setModalSem] = useState("");
  const [toggleadmin, setToggleadmin] = useState(true);
  const [modalSemList, setModalSemList] = useState([]);
  const [batchData, setBatchData] = useState({
    batchname: "",
    batchcode: "",
    academicyearcode: "",
    semestercode: "",
    schoolcode: "",
    departmentcode: "",
  });
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [rdata, setRdata] = useState({
    school: "",
    department: "",
  });

  useEffect(() => {
    getschoollist();
    getyearlist();
    checkPermision();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("usertype") === "cordinator") {
      getbatchlist();
      setToggleadmin(false);
    } else if (localStorage.getItem("usertype") === "admin") {
      setBatchlist([]);
    }
    setMenuVisible(false);
  }, []);

  const checkPermision = () => {
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
    setBatchData({ ...batchData, [e.target.name]: e.target.value });
  };

  const handleAddBatch = async () => {
    await addbatch(batchData);
    setBatchData({
      batchname: "",
      batchcode: "",
      academicyearcode: "",
      semestercode: "",
    });
    setModalYear("");
    setModalSem("");
    setModalSemList([]);
    getbatchlist("", rdata.school, rdata.department);
  };

  const handleEditStudents = (batch) => {
    setSelectedBatch(batch);
    setStudents(batch.students);

    const usertype = localStorage.getItem("usertype");
    if (usertype === "cordinator") {
      navigate("/cordinator/batches/editstudents");
    } else if (usertype === "admin") {
      navigate("/admin/batches/editstudents");
    }
  };

  const onChangeModalYear = async (e) => {
    const yearCode = e.target.value;
    setModalYear(yearCode);
    setBatchData({ ...batchData, academicyearcode: yearCode });
    const json = await getsemlist(yearCode);
    setModalSemList(json.semesterlist);
  };

  const onChangeModalSem = (e) => {
    const semCode = e.target.value;
    setModalSem(semCode);
    setBatchData({ ...batchData, semestercode: semCode });
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
    getbatchlist("", rdata.school, rdata.department);
    setBatchData({schoolcode:rdata.school,departmentcode:rdata.department,})
    setToggleadmin(false);
  };

  return (
    <div className="p-4">
      {toggleadmin && (
        <>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label htmlFor="school" className="block text-sm font-medium leading-6 text-gray-900">
              School
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
              Department
            </label>
            <div className="mt-2">
              <select
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            <br />
            <br />
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
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
            <h1 className="text-xl font-bold">Batches</h1>
            <button
              type="button"
              className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
              data-bs-toggle="modal"
              data-bs-target="#addBatchModal"
            >
              Add New Batch
            </button>
          </div>

          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Batch Name</th>
                  <th className="py-2 px-4 border-b text-left">Batch Code</th>
                  <th className="py-2 px-4 border-b text-left">Academic Year</th>
                  <th className="py-2 px-4 border-b text-left">Semester</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {batchlist.map((batch, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{batch.batchname}</td>
                    <td className="py-2 px-4 border-b">{batch.batchcode}</td>
                    <td className="py-2 px-4 border-b">{batch.academicyearcode}</td>
                    <td className="py-2 px-4 border-b">{batch.semestercode}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleEditStudents(batch)}
                      >
                        Edit Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Batch Modal */}
          <div
            className="modal fade"
            id="addBatchModal"
            tabIndex="-1"
            aria-labelledby="addBatchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addBatchModalLabel">
                    Add New Batch
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
                      <label htmlFor="academicyear" className="form-label">
                        Academic Year
                      </label>
                      <select
                        className="form-control"
                        id="academicyear"
                        name="academicyearcode"
                        onChange={onChangeModalYear}
                        value={modalYear}
                      >
                        <option value="">Select Academic Year</option>
                        {yearlist.map((year, index) => (
                          <option key={index} value={year.academicyearcode}>
                            {year.academicyearname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="semester" className="form-label">
                        Semester
                      </label>
                      <select
                        className="form-control"
                        id="semester"
                        name="semestercode"
                        onChange={onChangeModalSem}
                        value={modalSem}
                      >
                        <option value="">Select Semester</option>
                        {modalSemList.map((sem, index) => (
                          <option key={index} value={sem.semestercode}>
                            {sem.semestername}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="batchname" className="form-label">
                        Batch Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="batchname"
                        name="batchname"
                        onChange={onInputChange}
                        value={batchData.batchname}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="batchcode" className="form-label">
                        Batch Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="batchcode"
                        name="batchcode"
                        onChange={onInputChange}
                        value={batchData.batchcode}
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="flex justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleAddBatch}
                    data-bs-dismiss="modal"
                  >
                    Add Batch
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

export default Batches;
