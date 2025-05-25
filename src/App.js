import ExamGrid from "./Components/ExamGrid";
import Conductor from './Conductor';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
export default function App() {

    

    return (

        <>
            <Router>
                <Routes>
                    <Route path="/Conductor/:examId" element={<Conductor />} />
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
            
        </>

    );
}