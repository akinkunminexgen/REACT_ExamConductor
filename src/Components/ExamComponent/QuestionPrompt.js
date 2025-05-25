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


        
    
    
    function getValues(val, id) {
        setSelected(val);
        setGetQuestionId(id);
    }
    function handleSave() {
        setModalIsOpen(false);
        answerToSubmit(getQuestionId+":"+selected);
    }



    return (

        <>
            <button type="button" className={selected !== '' ? "btn btn-success btn-sm" : "btn btn-primary btn-sm"} onClick={() => setModalIsOpen(true)}>View Question</button>
            
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
                        <SaveOrCloseButton onClick={() => setModalIsOpen(false)} label="close" />
                    </div>
               
             </Modal>
        </>

    );
}