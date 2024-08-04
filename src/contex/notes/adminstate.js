import AdminContext from "./admincontext";
import config from "../../config";
const host = config.host;
const auth = localStorage.getItem("token");
const AdminState = (props) => {

  return (
    <AdminContext.Provider
      value={{

      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
