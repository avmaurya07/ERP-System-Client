import AdminHome from "./components/admin/AdminHome";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Studenthome from "./components/student/Studenthome";
import TeacherHome from "./components/teacher/TeacherHome";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AlertState from "./contex/alert/alertstate";
import RegisterState from "./contex/register/registerstate";
import UserListState from "./contex/userlist/userliststate";
import MainState from "./contex/main/mainstate";
import CordinatorHome from "./components/cordinator/CordinatorHome";
import BatchState from "./contex/batch/batchstate";
import Loader from "./components/loader";
import Reset from "./components/Reset";
import ClassesState from "./contex/classes/classesstate";

function App() {
  return (
    <div className="bg-slate-100 min-h-screen w-screen">
      <AlertState>
        <RegisterState>
          <UserListState>
            <MainState>
              <BatchState>
                <ClassesState>
                  <Alert />
                  <Loader />
                  <Router>
                    <Routes>
                      <Route exact path="/login" element={<Login />} />
                      <Route exact path="/resetpassword" element={<Reset />} />
                      <Route
                        exact
                        path="/student/*"
                        element={<Studenthome />}
                      />
                      <Route
                        exact
                        path="/teacher/*"
                        element={<TeacherHome />}
                      />
                      <Route
                        exact
                        path="/cordinator/*"
                        element={<CordinatorHome />}
                      />
                      <Route exact path="/admin/*" element={<AdminHome />} />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                  </Router>
                </ClassesState>
              </BatchState>
            </MainState>
          </UserListState>
        </RegisterState>
      </AlertState>
    </div>
  );
}

export default App;
