import { useState } from "react";
import AlertContext from "./alertcontext";
import config from "../../config";
const host = config.host;

const AlertState = (props) => {
  const [UserName, setUserName] = useState("");
  const [usertype, setusertype] = useState("");
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
    setUserName(json.name);
    setusertype(json.usertype);
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        getuserdata,
        UserName,
        usertype,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
