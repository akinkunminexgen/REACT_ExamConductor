import React, { useState, useEffect } from "react";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";
import Error from "../../Components/Error";
import InputText from "../../Components/InputText";
import { FaTimes, FaEdit, FaPlus } from "react-icons/fa";

export default function QuestionForm({ setModalOpen, handleSave, rowDataLength, toEdit = {} }) {
    const [form, setForm] = useState({});
    const [inputTag, setInputTag] = useState(["A"]);
    const [retrieveOptions, setRetrieveOptions] = useState({ A: [] });
    const [trackProvideAnswer, setTrackProvideAnswer] = useState(true);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);


    //function to know if question is being editted
    const enableEdit = () => {
;        setForm({ ...toEdit })

        const getOptionTag = toEdit.provideAnswer ? [] : toEdit.options.map((opt) => opt.value);
        const getOptionRetrieval = toEdit.provideAnswer ? [] : toEdit.options.reduce((acc, opt) => {
            acc[opt.value] = [opt.label, opt.isCorrect];
            return acc;
        }, {});
        const getTracking = toEdit.options && toEdit.options.length > 0 ? true : !toEdit.provideAnswer;
        setTrackProvideAnswer(getTracking);
        setInputTag(getOptionTag);
        setRetrieveOptions(getOptionRetrieval);
    }

    useEffect(() => {
        if (toEdit && Object.keys(toEdit).length > 0) {
            enableEdit();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    const toGetOptions = (value, key, forCheckbox = false) => {

        let newVal = [];

        //this logic helps to put both input text and checkbox together
        if (!forCheckbox) {
            newVal = [value, false];
        } else {
            //ensure multiple options can be clicked only if electedQuestion.isCheckBox is true
            if (!form.isMultipleAnswer && value) {
                const confirm = Object.entries(retrieveOptions).some(([key, value]) => value[1] === true);
                if (confirm) {
                    setError(`You need to ce answer! : ${Date.now()}`);
                    return;
                }
            }
            newVal = [retrieveOptions[key][0], value];
        }
        setRetrieveOptions((p) => ({ ...p, [key]: newVal }));
        console.log(retrieveOptions);
        return;
    }


    const includeInputText = () => {
        const alp = "ABCDEFG";
        const nextChar = alp[inputTag.length];

        if (!nextChar) return;
        setInputTag((prev) => [...prev, nextChar]);
        setRetrieveOptions((prev) => ({ ...prev, [nextChar]: ["", false] }))
    }

    const excludeInputText = () => {

        setInputTag((prev) => {
            if (prev.length === 0) return prev; 
            const newInputTag = prev.slice(0, -1); // remove last
            return newInputTag;
        });

        setRetrieveOptions((prev) => {
            const keys = Object.keys(prev);
            if (keys.length === 0) return prev;
            const lastKey = keys[keys.length - 1];
            const { [lastKey]: _, ...rest } = prev; //destruct to remove last key
            return rest;
        });
    }


    const validate = () => {
        let err = {};

        if (!form.text) err.text = "Required";
        if (!form.marks) err.marks = "Required";
        if (form.provideAnswer)
            return err;

        inputTag.forEach((key) => {
            const opt = retrieveOptions[key];
            if (!opt || !opt[0]) { 
                err[key] = "Required";
            }
        });
        
        if (!retrieveOptions.hasOwnProperty("B") || retrieveOptions.A.length <= 0) {
            
            err.B = "Required";
            setError(`You need more than one option! : ${Date.now()}`);
        }

        const trueCount = Object.values(retrieveOptions)
            .filter(v => v[1] === true)
            .length;

        const hasOne = trueCount === 1;
        const hasMoreThanOne = trueCount > 1;  
            
        if (form.isMultipleAnswer) {
            if (!hasMoreThanOne) {
                err.Answer = "Required";
                setError(`You need to check atleast one answer! : ${Date.now()}`);
            }
        }else{
            if (!hasOne) {
                err.Answer = "Required";
                setError(`You need to check atleast one answer! : ${Date.now()}`);
            }
        }
       

        return err;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        rowDataLength += 1;
        
        let err = validate();
        setErrors(err);
        console.log("SUBMITTED err:", err);       
        

        if (Object.keys(err).length === 0) {

            console.log("SUBMITTED DATA:", form);
            console.log("SUBMITTED retrieveOption:", retrieveOptions);
            const optionArray = Object.entries(retrieveOptions).map((val, i) => ({
                value: val[0],
                label: val[1][0],
                isCorrect: val[1][1],
            }));
            const latestQuestion = {
                ...form,
                questionId: form.questionId ?? rowDataLength,
                options: form.provideAnswer ? [] : optionArray || []
            }
            setForm(latestQuestion);
            console.log("SUBMITTED form:", latestQuestion);

            handleSave(latestQuestion);
            setModalOpen(false);
        }

        
    }

    return (

        <div className="p-3">
            <h5 className="mb-3">Create Question</h5>

            {/* Error Toast */}
            <Error errorMessage={error} />    

            <Form>
            {/* Question Text */}
                <FormGroup>
                    <Label for="text">Question Text</Label>
                    <Input
                        type="textarea"
                        name="text"
                        id="text"
                        rows={4} // 7 lines
                        value={form.text || ""}
                        onChange={handleInputChange}
                        style={{
                            fontSize: "0.9rem",  // optional: smaller font
                        }}
                        placeholder="Enter your question here"
                    />
                    {errors.text && <small className="text-danger">{errors.text}</small>}
                </FormGroup>

                <FormGroup >
                    <Row >
                        <div className="col-auto">
                            <Label className="fw-semibold text-secondary mb-0">Marks Allocated:</Label>
                        </div>
                        <div className="col-auto">
                            <Input
                                type="number"
                                name="marks"
                                min="1"
                                max="5"
                                value={form.marks || ""}
                                onChange={handleInputChange}
                                style={{ width: "100px" }}
                                className="rounded-3 border-1 shadow-sm px-2 form-control-sm"
                                placeholder="e.g. 5"
                            />
                            {errors.marks && <small className="text-danger">{errors.marks}</small>}
                        </div>
                        {(!trackProvideAnswer || !toEdit.options) &&
                            <>
                                <div className="col-auto">
                                    <Label className="fw-semibold text-secondary mb-0"><i className="bi bi-123 text-primary"> Student Should Provide answer?</i></Label>
                                </div>
                                <div className="col-auto">
                                    <Input
                                        type="checkbox"
                                        name="isMultipleAnswer"
                                        checked={form.provideAnswer || false}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setForm((prev) => ({ ...prev, provideAnswer: checked }));
                                            setTrackProvideAnswer(!checked);
                                        }}
                                    />
                                </div>
                            </>
                        }
                        
                        {trackProvideAnswer &&
                            <>
                                <div className="col-auto">
                                    <Label className="fw-semibold text-secondary mb-0">
                                        <i className="bi bi-123 text-primary"> Is it Multiple Answer?</i>
                                    </Label>
                                </div>
                                <div className="col-auto">
                                    <Input
                                        type="checkbox"
                                        name="isMultipleAnswer"
                                        checked={form.isMultipleAnswer || false}
                                        onChange={(e) =>
                                            setForm((prev) => ({ ...prev, isMultipleAnswer: e.target.checked }))
                                        }
                                    />
                                </div>
                            </>
                        }

                        

                    </Row>
                </FormGroup>

                {trackProvideAnswer && <FormGroup >
                    {inputTag.map((opt, i) => (


                        <Row key={`Option${i}`} style={{ paddingTop: "4px", paddingBottom: "4px", transform: "scale(0.95)" }}>
                            <Col sm="9" >
                                <InputText
                                    value={retrieveOptions[opt][0] || ""}
                                    name={`Option${opt}`}
                                    onChange={(e) => toGetOptions(e.target.value, opt)}
                                    label={`Option ${opt}`}
                                    forCheckBox={retrieveOptions[opt][1]}
                                    onChangeForCheckBox={(e) => toGetOptions(e.target.checked, opt, true)}
                                />
                                {errors[opt] && <small className="text-danger">{errors[opt]}</small>}
                            </Col>
                            {i === inputTag.length - 1 &&
                                <Col sm="3" className="text-end">
                                    <Button
                                        size="sm"
                                        color="primary"
                                        title="Add Student"
                                        style={{ backgroundColor: "#3d5987", borderColor: "#4f46e5", marginRight: "2px" }}
                                    onClick={includeInputText}><FaPlus /></Button>

                                    {inputTag.length - 1 > 0 && <Button
                                        size="sm"
                                        color="danger"
                                        title="Add Student"
                                        style={{ borderColor: "#4f46e5" }}
                                        onClick={excludeInputText}><FaTimes /></Button>}
                                </Col>                           
                                
                            }
                        </Row>
                    ))}
                </FormGroup >
                }

                {/* Button Row */}
                <FormGroup>
                    <div className="row mt-3">
                        <div className="col-6">
                            <Button color="danger" onClick={handleSubmit} className="w-100">
                                Save
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button color="secondary" onClick={() => setModalOpen(false)} className="w-100">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </div>
    );

}
