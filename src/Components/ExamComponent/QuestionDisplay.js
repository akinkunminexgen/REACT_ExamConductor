export default function QuestionDisplay({ question, id }) {

     return (

         <>
             <div className="question-border">
                 <p><label className="question-label" htmlFor={`question-${id}`}>Question {id}</label></p>
                 <label className="" htmlFor={`question-${id}`}> {question}</label>
             </div>
             
        </>

    );
}