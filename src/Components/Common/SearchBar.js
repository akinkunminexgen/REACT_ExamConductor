import { FaSearch } from "react-icons/fa";
import { Input, Button } from "reactstrap";

const SearchBar = ({
    value,
    onChange,
    onSearch,
    error,
    placeholder = "Search...",
    buttonText = "Search",
    inputName = "search",
}) => {
    return (
        <div className="row justify-content-center align-items-center text-center">
            <div className="col-md-4 col-12 mb-2 mb-md-0">
                <Input
                    name={inputName}
                    type="text"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                {error && <small className="text-danger">{error}</small>}
            </div>

            <div className="col-md-2 col-12">
                <Button
                    onClick={onSearch}
                    className="w-100 fancy-search-btn"
                >
                    <FaSearch className="me-2" />
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
