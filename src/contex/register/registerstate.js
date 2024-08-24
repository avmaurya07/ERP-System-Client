import { useContext } from "react";
import RegisterContext from "./registercontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const RegisterState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;

  //function to call registor api and show alert

  const register = async (rdata) => {
    let jsonbody = [];
    if (rdata.usertype === "admin") {
      jsonbody = {
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        password: rdata.password,
        usertype: "admin",
      };
    }
    if (rdata.usertype === "student") {
      jsonbody = {
        systemid: rdata.systemid,
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        school: rdata.school,
        department: rdata.department,
        password: rdata.password,
        usertype: "student",
      };
    }
    if (rdata.usertype === "teacher") {
      jsonbody = {
        empid: rdata.empid,
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        school: rdata.school,
        department: rdata.department,
        password: rdata.password,
        usertype: "teacher",
      };
    }
    if (rdata.usertype === "cordinator") {
      jsonbody = {
        empid: rdata.empid,
        name: rdata.name,
        email: rdata.email,
        phone: rdata.phone,
        school: rdata.school,
        department: rdata.department,
        usertype: "cordinator",
      };
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(jsonbody),
    });
    const json = await response.json();
    showAlert(json);
  };

  const changepassword =async (cdata) => {
    const response = await fetch(`${host}/api/auth/changepassword`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(cdata),
    });
    const json = await response.json();
    showAlert(json);
  }

  return (
    <RegisterContext.Provider
      value={{
        register,
        changepassword,
      }}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterState;
