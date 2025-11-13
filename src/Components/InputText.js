export default function InputText({ value, name, onChange, label, forCheckBox, onChangeForCheckBox }) {


    return (

                   
            <>
            <div className="input-group input-group mb-3 ">
                <span className="input-group-text small-font">{label}
                    <input
                        checked={forCheckBox ?? false}
                        onChange={onChangeForCheckBox}
                        className="form-check-input mt-0"
                        type="checkbox"
                        aria-label="Checkbox for following text input" />
                </span>
                <input type="text"
                    name={name}
                    id={`option-${value}`}
                    value={value}
                    onChange={onChange}
                    className="form-control"
                    />
            </div>                     
                        
            </>

    );
}