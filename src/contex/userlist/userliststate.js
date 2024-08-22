import React, { useContext, useState } from "react";
import UserListContext from "./userlistcontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const UserListState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [userlist, setUserlist] = useState([]);

  const fetchuserlist = async (usertype) => {
    const response = await fetch(`${host}/api/users/userlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ usertype: usertype }),
    });
    const json = await response.json();
    setUserlist(json.userlist)
    showAlert(json);
  };

  return (
    <UserListContext.Provider
      value={{
        userlist,
        fetchuserlist,
        setUserlist,
      }}
    >
      {props.children}
    </UserListContext.Provider>
  );
};

export default UserListState;
