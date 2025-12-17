import ExamGrid from "./components/ExamComponent/ExamGrid";
import Conductor from './pages/Conductor';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Student from './pages/Admin/Student';
import Question from './pages/Admin/Question';
import Settings from './pages/Admin/Settings';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ExamSchedule from './pages/Admin/ExamSchedule';
import Header from "./components/Panels/Header";
import PrivateRoute from "./helper/PrivateRoute";
import Login from "./sections/Login";
import Unauthorized from "./sections/Unauthorized";
import FooterMain from "./components/Panels/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { SidebarProvider } from "./context/SideBarContext";
export default function App() {
    Modal.setAppElement('#root');
    

    return (

        <>
            <SidebarProvider>
                <Router>
                    <Routes>
                        <Route element={<Header />}>
                            <Route index element={<Login />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />

                            <Route element={<PrivateRoute allowedRoles={["Student"]} />}>
                                <Route path="/Dashboard" element={<Dashboard />} />
                                <Route path="/Conductor/:examId" element={<Conductor />} />
                            </Route>

                            <Route element={<PrivateRoute allowedRoles={["Admin", "Lecturer", "Student"]} />}>
                                <Route path="/Students" element={<Student />} />
                                <Route path="/Questions" element={<Question />} />
                                <Route path="/Settings" element={<Settings />} />
                                <Route path="/Scheduling" element={<ExamSchedule />} />
                                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                            </Route>


                            {/* Add more routes as needed */}
                        </Route>                   
                    </Routes>
                </Router>
                <FooterMain />
            </SidebarProvider>
        </>

    );
}