import { useState, useEffect } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, CardFooter, CardTitle } from "reactstrap";

export default function ScheduleForm({ setModalOpen, handleSave, toEdit }) {

    const defaultSchedule = {
        examTitle: "",
        start: "",
        end: "",
        accessType: "all",
        classId: "",
        students: [],
        retakeAllowed: "no",
        maxAttempts: 0,
        lateAllowed: "no",
        lateMinutes: 0,
        durationMinutes: 0,
        shuffleQuestions: false,
        backtrackingAllowed: false,
        passMark: 0,
        totalMarks: 0,
        disableCopyPaste: false,
        disableScreenshots: false
    };

    const [schedule, setSchedule] = useState(defaultSchedule);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (toEdit) {
            setSchedule(toEdit)
            // Load other fields if needed
        }
    }, [toEdit]);

    const handleDataChange = (e) => {
        const { name, value, type } = e.target;
        console.log(type);
        setSchedule((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value)
                : type === "checkbox" ? checked
                    : value }));
    };

    const handleSubmit = () => {
        const payload = {
            ...schedule
        };

        console.log("Saved schedule:", payload);
        handleSave(payload);
        setModalOpen(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5">{toEdit ? "Edit Schedule" : "Create Exam Schedule"}</CardTitle>
            </CardHeader>

            <CardBody>
                <Form>

                    {/* Exam Info */}
                    <FormGroup>
                        <Label>Exam Title</Label>
                        <Input name="examTitle" value={schedule.examTitle} onChange={handleDataChange} />
                        {errors.Title && <small className="text-danger">{errors.Title}</small>}
                    </FormGroup>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Start Date & Time</Label>
                                <Input name="start" type="datetime-local" value={schedule.start} onChange={handleDataChange} />
                                {errors.Start && <small className="text-danger">{errors.Start}</small>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>End Date & Time</Label>
                                <Input name="end" type="datetime-local" value={schedule.end} onChange={handleDataChange} />
                                {errors.End && <small className="text-danger">{errors.End}</small>}
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <FormGroup check>
                        <div className="row text-center">
                            <div className="col-lg-3 col-sm-6">
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="shuffleQuestions"
                                        checked={schedule.shuffleQuestions}
                                        onChange={handleDataChange}
                                    /> Shuffle Questions
                                </Label>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <Label check>
                                <Input
                                    type="checkbox"
                                    name="backtrackingAllowed"
                                    checked={schedule.backtrackingAllowed}
                                    onChange={handleDataChange}
                                    /> Backtracking Allowed
                                </Label>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="disableCopyPaste"
                                        checked={schedule.disableCopyPaste}
                                        onChange={handleDataChange}
                                    /> Disable Copy/Paste
                                </Label>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="disableScreenshots"
                                        checked={schedule.disableScreenshots}
                                        onChange={handleDataChange}
                                    /> Disable Screenshots
                                </Label>
                            </div>
                                
                        </div>       
                    </FormGroup>

                    <div className="surrondBorder">                        
                        <FormGroup check>
                            <div className="row text-center">
                                <div className="col-md-4 col-sm-12">
                                    <Label>Duration (minutes)</Label>
                                    <Input
                                        type="number"
                                        name="durationMinutes"
                                        value={schedule.durationMinutes}
                                        onChange={handleDataChange}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <Label>Pass Mark</Label>
                                    <Input
                                        type="number"
                                        name="passMark"
                                        value={schedule.passMark}
                                        onChange={handleDataChange}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <Label>Total Marks</Label>
                                    <Input
                                        type="number"
                                        name="totalMarks"
                                        value={schedule.totalMarks}
                                        onChange={handleDataChange}
                                    />
                                </div>
                            </div>
                        </FormGroup>
                    </div>
                    
                    


                    {/* Who can take the exam */}
                    <div className="surrondBorder">
                        <h6 className="text-xl font-semibold mt-4">Who Can Take the Exam?</h6>
                        <FormGroup>
                            <div className="row text-center">
                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="accessType"
                                            value="all"
                                            checked={schedule.accessType === "all"}
                                            onChange={() => {

                                                setSchedule((prev) => ({
                                                    ...prev,
                                                    accessType: "all",
                                                    classId: "",
                                                    students: []
                                                }));
                                                
                                            }}
                                        /> All Students
                                    </Label>
                                </div>

                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="accessType"
                                            value="class"
                                            checked={schedule.accessType === "class"}
                                            onChange={handleDataChange}
                                        /> Selected Class
                                    </Label>
                                </div>

                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="accessType"
                                            value="specific"
                                            checked={schedule.accessType === "specific"}
                                            onChange={handleDataChange}
                                        /> Specific Students
                                    </Label>
                                </div>
                            </div>
                        </FormGroup>

                        {schedule.accessType === "class" && (
                            <FormGroup>
                                <Row>
                                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Select Class</Label></div>
                                    <div className="col-4">
                                        <Input name="classId" type="select" value={schedule.classId} onChange={handleDataChange}>
                                            <option value="">Select Class</option>
                                            <option value="jss1">JSS1</option>
                                            <option value="jss2">JSS2</option>
                                        </Input>
                                        {errors.Class && <small className="text-danger">{errors.Class}</small>}
                                    </div>      
                                </Row>                                                         
                            </FormGroup>
                        )}

                        {schedule.accessType === "specific" && (
                            <FormGroup>
                                <Row>
                                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Select Students</Label></div>
                                    <div className="col-4">
                                        <Input
                                            type="select"
                                            multiple
                                            value={schedule.students}
                                            onChange={(e) => {
                                                setSchedule((prev) => ({
                                                    ...prev,
                                                    students: [...e.target.selectedOptions].map(opt => opt.value)
                                                }));
                                            }}
                                        >
                                            <option value="1001">Student 1</option>
                                            <option value="1002">Student 2</option>
                                            <option value="1003">Student 3</option>
                                        </Input>
                                        {errors.Student && <small className="text-danger">{errors.Student}</small>}
                                    </div>
                                </Row>             
                             </FormGroup>
                        )}
                    </div>
                    
                    {/* Retake Rules */}
                    <div className="surrondBorder">
                        <h6 className="text-xl font-semibold mt-4">Retake Rules</h6>
                        <FormGroup>
                            <div className="row text-center">
                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="retakeAllowed"
                                            value="no"
                                            checked={schedule.retakeAllowed === "no"}
                                            onChange={() => {
                                                setSchedule((prev) => ({
                                                    ...prev,
                                                    retakeAllowed: "no",
                                                    maxAttempts:0
                                                }));
                                            }}
                                        /> No Retakes
                                    </Label>
                                    {errors.Grade && <small className="text-danger">{errors.Grade}</small>}
                                </div>

                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="retakeAllowed"
                                            value="yes"
                                            checked={schedule.retakeAllowed === "yes"}
                                            onChange={handleDataChange}
                                        /> Allow Retakes
                                    </Label>
                                </div>

                            </div>
                            {schedule.retakeAllowed === "yes" && (
                                <Input
                                    type="number"
                                    name="maxAttempts"
                                    className="mt-2"
                                    placeholder="Max Attempts"
                                    value={schedule.maxAttempts}
                                    onChange={handleDataChange}
                                />
                            )}
                        </FormGroup>
                    </div>

                    
                    

                    {/* Late Submission */}
                    <div className="surrondBorder">
                        <h6 className="text-xl font-semibold mt-4">Late Submission</h6>
                        <FormGroup>
                            <div className="row text-center">
                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="lateAllowed"
                                            value="no"
                                            checked={schedule.lateAllowed === "no"}
                                            onChange={handleDataChange}
                                        /> No Late Submission
                                    </Label>
                                    {errors.Grade && <small className="text-danger">{errors.Grade}</small>}
                                </div>

                                <div className="col-4">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="lateAllowed"
                                            value="yes"
                                            checked={schedule.lateAllowed === "yes"}
                                            onChange={handleDataChange}
                                        /> Allow Late Submission
                                    </Label>
                                </div>

                            </div>
                            {schedule.lateAllowed === "yes" && (
                                <Input
                                    type="number"
                                    name="lateMinutes"
                                    className="mt-2"
                                    placeholder="Max Late Minutes"
                                    value={schedule.lateMinutes}
                                    onChange={handleDataChange}
                                />
                            )}
                        </FormGroup>                            
                    </div>
                    
                </Form>
            </CardBody>


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
        </Card>
    );
}
