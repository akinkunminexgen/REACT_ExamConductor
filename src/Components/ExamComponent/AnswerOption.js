import { useState } from 'react';
export default function AnswerOption({ value, name, checked, onChange, label, radioOrCheckbox }) {


    return (

        <>
            <div className="options">
                <div className="option-item">
                    {!radioOrCheckbox ? 
                        <>
                            <input type="radio" 
                                name={name}
                                id={`option-${value}`} 
                                value={value} 
                                onChange={onChange} 
                                checked={checked} /> <label htmlFor={`option-${value}`}>{label}</label>
                        </>
                        :
                        <>
                            <input
                                type="checkbox"
                                id={`option-${value}`}
                                checked={checked}
                                onChange={onChange}
                                /> <label htmlFor={`option-${value}`}>{label}</label>
                        </>
                    }
                </div>
            </div>
        </>

    );
}