import Body from "../components/Panels/Body";
import { exams } from '../Data';
import { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardFooter, Button } from 'reactstrap';
import { Navigate } from "react-router-dom";
export default function Dashboard() {
    const [selectedExams, setSelectedExams] = useState([]);
    const [redirectTo, setRedirectTo] = useState(null);
    const now = new Date();

    useEffect(() => {
        setSelectedExams(exams);
    }, []);
    const startExam = (examId) => {
        setRedirectTo(`/Conductor/${examId}`);
    }

    if (redirectTo) {
       return <Navigate to={redirectTo} />;
    }
    const examStart = (theDate) => {
        return ((new Date(theDate) - now) / (1000 * 60)) >= 10;
    }
    const examClosed = (theDate) => {
        return ((new Date(theDate) - now) / (1000 * 60)) >= -90;
    }


    return (

        <>
            <Body>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h6 className="mb-2 text-center">Upcoming Assigned Exams</h6>
                <Row className="text-left">
                        {selectedExams.map((exam, index) => (
                            <Col sm={12} md={6} lg={6} key={index} style= {{ paddingTop: "1rem" }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h6">{exam.title}</CardTitle>
                                    </CardHeader>
                                <CardBody>
                                        {new Date(exam.Date).toLocaleString()}
                                        {examStart(exam.Date) && (
                                            <>
                                                <br />
                                                Starting in <span style={{ color: "red" }}>{Math.floor(((new Date(exam.Date) - new Date()) / (1000 * 60)) - 10)}</span> mins
                                            </>
                                        )}
                                    </CardBody>
                                    <CardFooter className="text-right">
                                        <Button size="sm" color={examStart(exam.Date) || !examClosed(exam.Date) ? "info" : "success"} onClick={() => startExam(exam.examId)} disabled={(examStart(exam.Date) || !examClosed(exam.Date))}>
                                            {examClosed(exam.Date) ? 'Start':'Closed' }
                                        </Button>
                                    </CardFooter>
                                 </Card>
                            </Col>
                        ))}                    
                    </Row>  
                </div>
            </Body>
        </>

    );
}