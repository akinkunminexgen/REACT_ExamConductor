import AnswerOption from "./AnswerOption";
export default function AnswerOptionsList({name, options, selected, onSelect }) {


    return (

        <>
            {options.map((option) => (
                <AnswerOption
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    name={`question-${name}`}
                    checked={selected === option.value}
                    onChange={() => onSelect(option.value, name)}
                />
            ))}
        </>

    );
}