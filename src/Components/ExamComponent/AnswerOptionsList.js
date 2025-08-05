import AnswerOption from "./AnswerOption";
export default function AnswerOptionsList({ name, options, selected, onSelect, isItCheckbox }) {

    const confirmIfChecked = (value) => {
        if (isItCheckbox && selected.length > 1) {
            return selected.includes(value);
        }
        return selected[0] === value;
    };

    return (

        <>
            {options.map((option) => (
                <AnswerOption
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    name={`question-${name}`}
                    checked={confirmIfChecked(option.value)}
                    onChange={() => onSelect(option.value, name, isItCheckbox)}
                    radioOrCheckbox={isItCheckbox}
                />
            ))}
        </>

    );
}