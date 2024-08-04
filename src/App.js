import AdminHome from "./components/admin/AdminHome";
import Login from "./components/Login";
import Studenthome from "./components/student/Studenthome";
import TeacherHome from "./components/teacher/TeacherHome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-slate-100 min-h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/student/*" element={<Studenthome />} />
          <Route path="/teacher/*" element={<TeacherHome />} />
          <Route path="/admin/*" element={<AdminHome />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
