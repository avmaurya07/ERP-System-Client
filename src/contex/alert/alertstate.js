import { useState } from "react";
import AlertContext from "./alertcontext";
import config from "../../config";
const host = config.host;
let iscordinator=false;

const AlertState = (props) => {
  const [UserName, setUserName] = useState("");
  const [usertype, setusertype] = useState("");
  const [empid, setEmpid] = useState("");
  const [alert, setAlert] = useState([{ success: true, msg: "" }]);
  const showAlert = (json) => {
    setAlert({
      success: json.msgtype,
      msg: json.msg,
    });
    setTimeout(() => {
      setAlert({ success: true, msg: "" });
    }, 2000);
  };
  const getuserdata = async () => {
    const response = await fetch(`${host}/api/auth/getuserdata`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        usertype: localStorage.getItem("usertype"),
      }),
    });
    const json = await response.json();
    setUserName(json.user.name);
    setusertype(json.user.usertype);
    iscordinator=json.iscordinator;
    if((json.user.usertype==="teacher") || json.user.usertype==="cordinator"){
      setEmpid(json.user.empid)
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        getuserdata,
        UserName,
        empid,
        usertype,
        iscordinator,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
