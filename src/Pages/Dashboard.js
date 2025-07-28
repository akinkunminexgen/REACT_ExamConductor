import Body from "../Components/Panels/Body";
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
                                    </CardBody>
                                    <CardFooter className="text-right">
                                        <Button size="sm" color={((new Date(exam.Date) - now) / (1000 * 60)) >= 30 ? "info" : "success"} onClick={() => startExam(exam.examId)} disabled={((new Date(exam.Date) - now) / (1000 * 60)) >= 30}>
                                            Start
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