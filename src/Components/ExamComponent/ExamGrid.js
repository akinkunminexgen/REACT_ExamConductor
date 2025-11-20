import QuestionPrompt from "./QuestionPrompt";
import CountdownTimer from "../../Helper/CountdownTimer";
import Paginate from "../Panels/Pagination";

import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardFooter, Button } from "reactstrap";
import { useEffect, useState } from 'react';
import Modal from "react-modal";
export default function Examgrid({ exam, getAnswer, onAnswerChange, submitAnswers }) {
    const [currentPage, setCurrentPage] = useState(1);


    const questions = [...exam.questions];    
    const itemsPerPage = exam.questionPerPage;

    const totalPages = Math.ceil(questions.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentQuestions = questions.slice(indexOfFirst, indexOfLast);

    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };
    

    const theAnswer = (answer) => {

        const { questionId, selectedOptions } = answer;
        onAnswerChange(questionId, selectedOptions);        
    };

    const handleTimeUp = () => {
        submitAnswers();
    };

    return (

        <>
            <Container className="mt-3">
                <CountdownTimer userId={exam.student.studentId}
                    examId={exam.examId}
                    durationSeconds={exam.durationMinutes}
                    onTimeUp={handleTimeUp} />
                <Row>
                    {currentQuestions.map((question, index) => (
                        <Col key={question.questionId || index} xl={2} lg={3} md={4} sm={6} xs={12} className="mb-4">
                            <Card className="h-100 shadow-sm d-flex flex-column">
                                <CardBody className="d-flex flex-column">
                                    <CardTitle tag="h6" className="mb-3" style={{ fontSize: "12px" }}>
                                        {(index + (itemsPerPage * (currentPage-1))) + 1}: {question.text.length < 55
                                            ? question.text + '\u00A0'.repeat(55 - question.text.length)
                                            : question.text.slice(0, 55) + ' ...'}
                                    </CardTitle>
                                    <div className="mt-auto">
                                        <QuestionPrompt question={question} answerToSubmit={theAnswer} verifyAnswer={getAnswer} />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <small className="text-muted">Your Answer:{" "}
                                        {getAnswer[question.questionId] ? (
                                            <span className="badge bg-success text-white">
                                                {getAnswer[question.questionId].join(" ")}
                                            </span>
                                        ) : (
                                                <span className="text-muted badge bg-danger text-white"></span>
                                        )}</small>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Paginate currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
            </Container>
        </>

    );
}