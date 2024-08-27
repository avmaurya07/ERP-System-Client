import React, { useContext } from "react";
import AlertContext from "../contex/alert/alertcontext";

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    <div
      className={`fixed z-40 top-5 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-full ${
        alert.msg ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
      style={{ pointerEvents: alert.msg ? "auto" : "none" }}
    >
      {alert.msg && (
        <div
          className={`flex justify-between items-center ${
            alert.success
              ? "bg-teal-100 border-teal-400 text-teal-700"
              : "bg-red-100 border-red-400 text-red-700"
          } px-4 py-3 rounded-lg shadow-lg`}
          role="alert"
        >
          <span className="block sm:inline pl-2">
            <strong className="font-bold">
              {alert.success ? "Success" : "Error"}:
            </strong>{" "}
            {alert.msg}
          </span>
          <button
            className={`ml-4 ${
              alert.success ? "text-teal-700 hover:text-teal-900" : "text-red-700 hover:text-red-900"
            } focus:outline-none`}
            onClick={() => {
              alert.msg = null; 
            }}
          >
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
