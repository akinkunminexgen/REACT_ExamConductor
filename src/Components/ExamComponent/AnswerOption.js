import { useState } from 'react';
export default function AnswerOption({ value, name, checked, onChange, label }) {



    return (

        <>
            <div className="options">
                <div className="option-item">
                    <input type="radio" name={name} id="" value={value} onChange={onChange} checked={checked} /> <label htmlFor={ value }>{ label }</label>
                </div>
            </div>
        </>

    );
}