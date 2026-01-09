import { Card, CardBody, Input } from "reactstrap";

const SelectableCardItem = ({
    id,
    label,
    type = "checkbox",
    name,
    isSelected,
    onSelect,
    colClass = "col-md-4 col-12",
}) => {
    return (
        <div className={`${colClass} mb-2`}>
            <Card
                onClick={() => onSelect(id)}
                className={`cursor-pointer ${type === "radio" ? "class-card" : "student-card"
                    } ${isSelected ? "selected" : ""}`}
            >
                <CardBody className="d-flex align-items-center gap-3">
                    <label
                        className={type === "radio" ? "fancy-radio" : "fancy-checkbox"}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Input
                            type={type}
                            name={name}
                            checked={isSelected}
                            onChange={() => onSelect(id)}
                        />

                        {type === "radio" ? (
                            <span className="radiomark"></span>
                        ) : (
                            <span className="checkmark"></span>
                        )}

                        <span className="card-name-data ml-2">
                            {label}
                        </span>
                    </label>
                </CardBody>
            </Card>
        </div>
    );
};

export default SelectableCardItem;
