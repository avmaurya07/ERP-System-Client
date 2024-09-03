import React, { useState, useEffect, useContext } from 'react';
import config from "../../config";
import MainContext from "../../contex/main/maincontext";
import { useNavigate } from "react-router-dom";
const host = config.host;

const Timetable = () => {
  const navigate = useNavigate();
  const context1 = useContext(MainContext);
  const { yearlist, getyearlist, getsemlist, selectedRoles } = context1;

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [weekCode, setWeekCode] = useState('');
  const [semList, setSemList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getyearlist();
    checkPermission();
  }, []);

  const checkPermission = () => {
    if (localStorage.getItem("usertype") === "cordinator" && !selectedRoles.timetable) {
      return navigate("/cordinator");
    }
  };

  const onYearChange = async (e) => {
    const yearCode = e.target.value;
    setSelectedYear(yearCode);
    const json = await getsemlist(yearCode);
    setSemList(json.semesterlist);
  };

  const onSemChange = (e) => {
    setSelectedSem(e.target.value);
  };

  const onWeekCodeChange = (e) => {
    setWeekCode(e.target.value);
  };

  const fetchClassList = async (yearCode, semCode) => {
    const response = await fetch(`${host}/api/academic/cordinatortimetable`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        academicyearcode: yearCode,
        semestercode: semCode,
        weekcode: weekCode
      }),
    });
    const data = await response.json();
    if (data.msgtype) { setClassList(data.timetable); }
    return
  };

  const handleSearch = () => {
    fetchClassList(selectedYear, selectedSem);
  };

  const handleEditClass = (classItem) => {
    navigate(`/editclass/${classItem.id}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClassList = classList.filter(classItem =>
    classItem.classcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out"
          onClick={handleOpenModal}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
            Year
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={onYearChange}
            value={selectedYear}
          >
            <option value="">Select a Year</option>
            {yearlist.map((year, index) => (
              <option key={index} value={year.academicyearcode}>
                {year.academicyearname}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">
            Semester
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={onSemChange}
            value={selectedSem}
          >
            <option value="">Select a Semester</option>
            {semList.map((sem, index) => (
              <option key={index} value={sem.semestercode}>
                {sem.semestername}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="weekCode" className="block text-sm font-medium leading-6 text-gray-900">
            Week Code
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={onWeekCodeChange}
            value={weekCode}
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Classes</h2>
                <div className="mb-4 flex justify-start">
          <input
            type="text"
            placeholder="Search by Class Code"
            className="block w-1/3 rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full bg-white border table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Class Code</th>
                <th className="py-2 px-4 border-b text-left">Week Code</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClassList.map((classItem, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{classItem.classcode}</td>
                  <td className="py-2 px-4 border-b">{classItem.weekcode}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleEditClass(classItem)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modal-title">Add a new Week</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="weekOption" className="form-label">Select Option</label>
                  <select
                    className="form-control"
                    onChange={handleOptionChange}
                    value={selectedOption}
                  >
                    <option value="">Select an Option</option>
                    <option value="copy">Copy current week schedule</option>
                    <option value="fresh">Add a fresh Week</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;