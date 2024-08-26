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

  const getbatchlist = async (batchcode) => {
    const response = await fetch(`${host}/api/academic/getbatchlist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ batchcode: batchcode }),
    });
    const json = await response.json();
    if (json.msgtype) {
      setBatchlist(json.batchlist);
    }
    return json;
  };

  const addbatch = async (data) => {
    const response = await fetch(`${host}/api/academic/createbatch`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        academicyearname: data.academicyearname,
        academicyearcode: data.academicyearcode,
        semestername: data.semestername,
        semestercode: data.semestercode,
        batchname: data.batchname,
        batchcode: data.batchcode,
      }),
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
      }}
    >
      {props.children}
    </BatchContext.Provider>
  );
};

export default BatchState;
