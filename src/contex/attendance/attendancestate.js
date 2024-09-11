import { useState } from "react";
import AttendanceContext from "./attendancecontext";
import config from "../../config";
const host = config.host;

const AttendanceState = (props) => {
    const [selectedClass, setSelectedClass] = useState({});
    const [studentlist, setStudentlist] = useState([]);


    const markAttendance = async (data,weekcode) => {
        const response = await fetch(`${host}/api/academic/takeattendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              academicyearcode:data.academicyearcode,
              semestercode:data.semestercode,
              coursename:data.coursename,
              coursecode:data.coursecode,
              weekcode:weekcode,
              classcode:data.classcode,
              batchcode:data.batchcode,
              slot:data.slot,
            }),
        });
        const resData = await response.json();
        setStudentlist(resData.students);
    };
  return (
    <AttendanceContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
        studentlist,
        setStudentlist,
        markAttendance,
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceState;
