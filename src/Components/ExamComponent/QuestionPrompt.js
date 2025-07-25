import AnswerOptionsList from "./AnswerOptionsList";
import SaveOrCloseButton from "./SaveOrCloseButton";
import QuestionDisplay from "./QuestionDisplay";
import { useRef, useEffect, useState } from 'react';
import Modal from "react-modal";

export default function QuestionPrompt({ question, answerToSubmit, verifyAnswer }) {
    Modal.setAppElement('#root');
    const [selected, setSelected] = useState('');
    const [getQuestionId, setGetQuestionId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const savedAnswer = verifyAnswer[question.questionId] ?? "";

    useEffect(() => {
        if (savedAnswer !== selected && !modalIsOpen) {
            setSelected(savedAnswer ?? "");
        }       
    }, [question.questionId, savedAnswer]);


    const getValues = (val, id) => {
        setSelected(val);
        setGetQuestionId(id);
    }
    const handleSave = () => {
        setModalIsOpen(false);
        answerToSubmit(getQuestionId+":"+selected);
    }

    const cancelOptions = () => {
        
        if (savedAnswer != "") {
            setSelected((prev) => savedAnswer);
        } else {
            setSelected((prev) => '');
        }
        setModalIsOpen(false);
        
    }



    return (

        <>
            <button type="button" className={`btn btn-sm ${selected !== '' ? "btn-success" : "btn-primary"} no-transition`} onClick={() => setModalIsOpen(true)}>View Question</button>
            
            <Modal isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="my-modal-content"
                overlayClassName="my-modal-overlay">
                
                <QuestionDisplay question={question.text} id={question.questionId} />
                    <AnswerOptionsList
                    name={question.questionId}
                    options={question.options}
                    selected={selected}
                    onSelect={getValues} />
                <div className="modal-buttons">
                    <SaveOrCloseButton onClick={handleSave} label="save" />
                    <SaveOrCloseButton onClick={cancelOptions} label="close" />
                    </div>
               
             </Modal>
        </>

    );
}