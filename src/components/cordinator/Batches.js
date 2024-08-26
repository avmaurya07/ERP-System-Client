import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BatchContext from "../../contex/batch/batchcontext";
import MainContext from "../../contex/main/maincontext";

const Batches = () => {
  const navigate = useNavigate();
  const context = useContext(BatchContext);
  const { batchlist, getbatchlist, addbatch,setSelectedBatch } = context;
  const context1 = useContext(MainContext);
  const { yearlist, getyearlist, getsemlist, selectedRoles } = context1;
  const checkPermision = ()=>{
      if (!(selectedRoles.studentcontrol)){
         return navigate("/cordinator");
      }
  }
  useEffect(() => {
    checkPermision();
  }, []);

  
  const [modalYear, setModalYear] = useState("");
  const [modalSemList, setModalSemList] = useState([]);
  const [batchData, setBatchData] = useState({
    batchname: "",
    batchcode: "",
    academicyear: "",
    semester: "",
  });





  const onInputChange = (e) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value });
  };

  const handleAddBatch = async () => {
    await addbatch(batchData);
    setBatchData({
      batchname: "",
      batchcode: "",
      academicyearcode: "",
      semestercode: "",
    });
    setModalYear(""); 
    setModalSemList([]);
    getbatchlist();
  };

  const handleEditStudents = (batch) => {
    setSelectedBatch(batch)
    navigate("/cordinator/batches/editstudents");
  };




  const onChangeModalYear = async (e) => {
    setModalYear(e.target.value);
    console.log(modalYear)
    setBatchData({ ...batchData, academicyearcode: e.target.value });
    const json = await getsemlist(e.target.value);
    setModalSemList(json.semesterlist); 
  };

  useEffect(() => {
    getyearlist();
    getbatchlist();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Batches</h1>
        <button
          type="button"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          data-bs-toggle="modal"
          data-bs-target="#addBatchModal"
        >
          Add New Batch
        </button>
      </div>

      

      <div className="overflow-auto max-h-96">
        <table className="min-w-full bg-white border table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Batch Name</th>
              <th className="py-2 px-4 border-b text-left">Batch Code</th>
              <th className="py-2 px-4 border-b text-left">Academic Year</th>
              <th className="py-2 px-4 border-b text-left">Semester</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {batchlist.map((batch, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{batch.batchname}</td>
                <td className="py-2 px-4 border-b">{batch.batchcode}</td>
                <td className="py-2 px-4 border-b">{batch.academicyearcode}</td>
                <td className="py-2 px-4 border-b">{batch.semestercode}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-700"
                    onClick={() => handleEditStudents(batch)}
                  >
                    Edit Students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>





      {/* Add Batch Modal */}
      <div
        className="modal fade"
        id="addBatchModal"
        tabIndex="-1"
        aria-labelledby="addBatchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addBatchModalLabel">
                Add New Batch
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="academicyear" className="form-label">
                    Academic Year
                  </label>
                  <select
                    className="form-control"
                    id="academicyear"
                    name="academicyearcode"
                    onChange={onChangeModalYear}
                    value={modalYear}
                  >
                    <option value="">Select Academic Year</option>
                    {yearlist.map((year, index) => (
                      <option key={index} value={year.academicyearcode}>
                        {year.academicyearname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="semester" className="form-label">
                    Semester
                  </label>
                  <select
                    className="form-control"
                    id="semester"
                    name="semestercode"
                    onChange={onInputChange}
                    value={batchData.semester}
                  >
                    <option value="">Select Semester</option>
                    {modalSemList.map((sem, index) => (
                      <option key={index} value={sem.semestercode}>
                        {sem.semestername}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="batchname" className="form-label">
                    Batch Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="batchname"
                    name="batchname"
                    onChange={onInputChange}
                    value={batchData.batchname}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="batchcode" className="form-label">
                    Batch Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="batchcode"
                    name="batchcode"
                    onChange={onInputChange}
                    value={batchData.batchcode}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddBatch}
                data-bs-dismiss="modal"
              >
                Add Batch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batches;
