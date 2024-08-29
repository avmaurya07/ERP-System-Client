import React, { useState, useEffect, useContext } from 'react';
import config from "../../config";
import AlertContext from '../../contex/alert/alertcontext';
const host = config.host;

const CourseList = () => {
  const context = useContext(AlertContext);
  const { setLoading } = context;
  const [courses, setCourses] = useState([]);
  const [filteredcourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from an API or define it statically
    const fetchCourses = async () => {
      setLoading(true);
      const response = await fetch(`${host}/api/academic/mycourses`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },});
      const json = await response.json();
      setLoading(false);
      setCourses(json.mycourses);
      setFilteredCourses(json.mycourses);
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <div className="overflow-auto max-h-96">
        <table className="min-w-full bg-white border table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Course Code</th>
              <th className="py-2 px-4 border-b text-left">Course Name</th>
              <th className="py-2 px-4 border-b text-left">Instructor</th>
              <th className="py-2 px-4 border-b text-left">Section Name</th>
              <th className="py-2 px-4 border-b text-left">Section Code</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-2 px-4 text-center">
                  No courses available.
                </td>
              </tr>
            ) : (
              filteredcourses.map((course) => (
                <tr key={course.id}>
                  <td className="py-2 px-4 border-b">{course.coursecode}</td>
                  <td className="py-2 px-4 border-b">{course.coursename}</td>
                  <td className="py-2 px-4 border-b">{course.teachername}</td>
                  <td className="py-2 px-4 border-b">{course.batchname}</td>
                  <td className="py-2 px-4 border-b">{course.batchcode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;