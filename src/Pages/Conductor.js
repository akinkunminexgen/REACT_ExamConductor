import ExamGrid from "../Components/ExamComponent/ExamGrid";
import Body from "../Components/Panels/Body";
import { exams } from '../Data';
import { useRef, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
export default function Conductor() {

    const { examId } = useParams();
    const exam = exams.find(ex => ex.examId == examId);
    const [getAnswer, setGetAnswer] = useState([]);
    const COOKIE_NAME = `answers_exam_${exam.examId}_user_${exam.student.studentId}`;

    const submitAnswers = async () => {
        ;
        const payload = {
            studentId: exam.student.studentId,  
            examId: exam.examId,           
            answers: Object.entries(getAnswer).map(([questionId, answer]) => ({
                questionId,
                answer
            }))
        };
        console.log("submission payload", payload);
        try {
            const response = await fetch("/api/submit-answers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to submit answers.");
            }

            Cookies.remove(COOKIE_NAME); // Clean up
            alert("Answers submitted successfully!");
        } catch (error) {
            Cookies.remove(COOKIE_NAME);//take it out later
            Cookies.remove(`exam_${exam.examId}_user_${exam.student.studentId}_end_time`)//this is to kill time take this out later
            console.error("Submission error:", error);
            alert("There was a problem submitting your answers.");
        }
    };

    useEffect(() => {
        const savedAnswers = Cookies.get(COOKIE_NAME);
        if (savedAnswers) {
            try {
                setGetAnswer(JSON.parse(savedAnswers));
            } catch (e) {
                console.error("Invalid cookie data");
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAnswers(); 
    };

    const handleAnswerChange = (qid, answer) => {
        const updatedAnswers = {
            ...getAnswer, [(qid || "").trim()]: answer
        };
        setGetAnswer(updatedAnswers);

        Cookies.set(COOKIE_NAME, JSON.stringify(updatedAnswers), { expires: 1 });
    };

    return (

        <>
            <Body>
                <form onSubmit={handleSubmit}>
                    <ExamGrid exam={exam} getAnswer={getAnswer} onAnswerChange={handleAnswerChange} submitAnswers={submitAnswers} />

                    <div className="d-grid gap-2 col-1 mx-auto">
                        <Button size="lg" color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Body>        
        </>

    );
}