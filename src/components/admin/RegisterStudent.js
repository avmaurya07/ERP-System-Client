import React, { useContext, useState } from "react";
import RegisterContext from "../../contex/register/registercontext";

const RegisterStudent = () => {
  const context = useContext(RegisterContext);
  const { register } = context;

  const [rdata, setRdata] = useState({
    systemid: "",
    name: "",
    email: "",
    phone: "",
    school: "",
    department: "",
    password: "1234",
    usertype: "student",
  });

  const onChange = (e) => {
    setRdata({ ...rdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(rdata);

    setRdata({
      systemid: "",
      name: "",
      email: "",
      phone: "",
      school: "",
      department: "",
    });
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register a Student
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              System ID
            </label>
            <div className="mt-2">
              <input
                id="systemid"
                name="systemid"
                type="text"
                required
                onChange={onChange}
                value={rdata.systemid}
                placeholder="  Enter your System ID"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name of Student
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                onChange={onChange}
                value={rdata.name}
                placeholder="  Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email of Student
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={onChange}
                value={rdata.email}
                placeholder="  Email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone of Student
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                required
                onChange={onChange}
                value={rdata.phone}
                placeholder="  Phone Number Of Student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              School
            </label>
            <div className="mt-2">
              <select
                name="school"
                id="school"
                required
                onChange={onChange}
                value={rdata.school}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="0">Select School</option>
                <option value="set">
                  Sharda School Of Engineering & Technology
                </option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Department
            </label>
            <div className="mt-2">
              <select
                name="department"
                id="department"
                required
                onChange={onChange}
                value={rdata.department}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="0">Select Department</option>
                <option value="cse">CSE</option>
              </select>
            </div>
          </div>

        
          <div>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterStudent;
