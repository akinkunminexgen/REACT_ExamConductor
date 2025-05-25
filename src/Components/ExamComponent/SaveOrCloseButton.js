export default function SaveOrCloseButton({onClick, disabled = false, label = 'Submit Answer' }) {

 

    return (

        <>
            <button
                type="button"
                disabled={disabled}
                className={(label === "save" ? `submit-btn ${disabled ? 'disabled' : ''}` : `submit-btn-close ${disabled ? 'disabled' : ''}`)}
                onClick={onClick}
            >
                {label}
            </button>
        </>

    );
}