import AsyncSelect from "react-select/async";

export default function AsyncComboBox({
    label,
    placeholder,
    loadOptions,
    value,
    onChange,
    getOptionLabel,
    getOptionValue,
    isDisabled = false
}) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <AsyncSelect
                cacheOptions
                defaultOptions
                isClearable
                isDisabled={isDisabled}
                placeholder={placeholder}
                loadOptions={loadOptions}
                value={value}
                onChange={onChange}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
            />
        </div>
    );
}
