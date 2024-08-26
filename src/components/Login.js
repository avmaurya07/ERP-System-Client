import React, { useContext, useEffect, useState } from "react";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../contex/alert/alertcontext";
const host = config.host;

const Login = () => {
  const context = useContext(AlertContext);
  const { showAlert } = context;
  const navigate = useNavigate();
  const [ldata, setLdata] = useState({
    systemid: "",
    password: "",
    usertype: "student",
  });
  const onChange = (e) => {
    setLdata({ ...ldata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemid: ldata.systemid,
        password: ldata.password,
        usertype: ldata.usertype,
      }),
    });

    const json = await response.json();
    showAlert(json);
    if (json.msgtype) {
      //save the token on local storage and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("usertype", json.usertype);

      if (json.usertype === "admin") {
        navigate("/admin");
      }
      if (json.usertype === "student") {
        navigate("/student");
      }
      if (json.usertype === "teacher") {
        navigate("/teacher");
      }
      if (json.usertype === "cordinator") {
        navigate("/cordinator");
      }
      // window.location.reload(true);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("usertype") === "admin") {
      navigate("/admin");
    }
    if (localStorage.getItem("usertype") === "student") {
      navigate("/student");
    }
    if (localStorage.getItem("usertype") === "teacher") {
      navigate("/teacher");
    }
    if (localStorage.getItem("usertype") === "cordinator") {
      navigate("/cordinator");
    }
  }, [navigate]);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to System
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {ldata.usertype === "student" && (
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  System ID
                </label>
              )}
              {ldata.usertype === "teacher" && (
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Employee ID
                </label>
              )}
              {ldata.usertype === "admin" && (
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Admin Email ID
                </label>
              )}
              <div className="mt-2">
                <input
                  id="systemid"
                  name="systemid"
                  type="text"
                  required
                  onChange={onChange}
                  placeholder="  Enter your System ID"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={onChange}
                  placeholder="  Enter your Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="usertype"
                  value="student"
                  onChange={onChange}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Student
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="usertype"
                  value="teacher"
                  onChange={onChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Teacher
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="usertype"
                  value="admin"
                  onChange={onChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  Admin
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
