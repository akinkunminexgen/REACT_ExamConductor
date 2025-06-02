import ExamGrid from "./Components/ExamComponent/ExamGrid";
import Conductor from './Pages/Conductor';
import Home from './Pages/Home';
import Student from './Pages/Student';
import Header from "./Components/Panels/Header";
import PrivateRoute from "./Helper/PrivateRoute";
import Login from "./Sections/Login";
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
                        <Route path="/Students" element={<PrivateRoute><Student /></PrivateRoute>} />
                        <Route path="/Conductor/:examId" element={<PrivateRoute><Conductor /></PrivateRoute>} />
                    
                   
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
            <FooterMain/>
        </>

    );
}