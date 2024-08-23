import React, { useContext, useState } from "react";
import MainContext from "./maincontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const MainState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [schoollist, setSchoollist] = useState([]);
  const [departmentslist, setDepartmentslist] = useState([]);

 

  const getschoollist = async () => {
    const response = await fetch(`${host}/api/master/getschoollist`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.msgtype) {
      setSchoollist(json.schoollist)
    }
    showAlert(json);
    return json
    
  };
  const getdepartmentlist = async (schoolcode) => {
    const response = await fetch(`${host}/api/master/getdepartmentlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({schoolcode:schoolcode}),
    });
    const json = await response.json();
    if (json.msgtype) {
        setDepartmentslist(json.departmentlist)
    }
    showAlert(json);
    return json
    
  };

  return (
    <MainContext.Provider
      value={{
        schoollist,
        departmentslist,
        getschoollist,
        getdepartmentlist,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
