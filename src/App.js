import ExamGrid from "./Components/ExamComponent/ExamGrid";
import Conductor from './Pages/Conductor';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Student from './Pages/Admin/Student';
import Question from './Pages/Admin/Question';
import Settings from './Pages/Admin/Settings';
import ExamSchedule from './Pages/Admin/ExamSchedule';
import Header from "./Components/Panels/Header";
import PrivateRoute from "./Helper/PrivateRoute";
import Login from "./Sections/Login";
import Unauthorized from "./Sections/Unauthorized";
import FooterMain from "./Components/Panels/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { SidebarProvider } from "./Components/Panels/Sidebar/SideBarContext";
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