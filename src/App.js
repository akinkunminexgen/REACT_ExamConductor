import ExamGrid from "./Components/ExamComponent/ExamGrid";
import Conductor from './Pages/Conductor';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Student from './Pages/Student';
import Header from "./Components/Panels/Header";
import PrivateRoute from "./Helper/PrivateRoute";
import Login from "./Sections/Login";
import Unauthorized from "./Sections/Unauthorized";
import FooterMain from "./Components/Panels/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
export default function App() {
    Modal.setAppElement('#root');
    

    return (

        <>
            <Header/>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />


                    <Route element={<PrivateRoute allowedRoles={["Admin", "Student"]} />}>
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Students" element={<Student />} />
                        <Route path="/Conductor/:examId" element={<Conductor />} />
                    </Route>
                    
                   
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
            <FooterMain/>
        </>

    );
}