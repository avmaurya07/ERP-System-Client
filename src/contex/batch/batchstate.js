import React, { useContext, useState } from "react";
import BatchContext from "./batchcontext";
import config from "../../config";
import AlertContext from "../alert/alertcontext";
const host = config.host;
const BatchState = (props) => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const [batchlist, setBatchlist] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({
    academicyearcode: "",
    batchcode: "",
    batchname: "",
    departmentcode: "",
    schoolcode: "",
    semestercode: "",
    students: [],
  });

  const getbatchlist = async (batchcode, school, department) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = batchcode;
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        batchcode: batchcode,
        schoolcode: school,
        departmentcode: department,
      };
    }
    const response = await fetch(`${host}/api/academic/getbatchlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (json.msgtype) {
      setBatchlist(json.batchlist);
    }
    return json;
  };

  const addbatch = async (data) => {
    let body = [];
    if (localStorage.getItem("usertype") === "cordinator") {
      body = data;
    } else if (localStorage.getItem("usertype") === "admin") {
      body = {
        academicyearname: data.academicyearname,
        academicyearcode: data.academicyearcode,
        semestername: data.semestername,
        semestercode: data.semestercode,
        batchname: data.batchname,
        batchcode: data.batchcode,
        schoolcode: data.batchcode,
        departmentcode: data.batchcode,
      };
    }
    const response = await fetch(`${host}/api/academic/createbatch`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({body}),
    });
    const json = await response.json();
    showAlert(json);
    return json;
  };

  return (
    <BatchContext.Provider
      value={{
        batchlist,
        getbatchlist,
        addbatch,
        selectedBatch,
        setSelectedBatch,
        setBatchlist,
      }}
    >
      {props.children}
    </BatchContext.Provider>
  );
};

export default BatchState;
