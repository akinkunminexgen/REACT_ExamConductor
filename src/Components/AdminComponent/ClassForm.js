import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Badge,
    Alert,
} from "reactstrap";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUserGraduate, FaCalendarAlt, FaFileImport, FaFileExport, FaDownload } from "react-icons/fa";
import AsyncComboBox from "../../components/Common/AsyncComboBox";

const initialFormState = {
    courseId: "",
    termId: "",
    teacherId: "",
    sectionCode: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    status: "",
    teacherName: null,
    courseName: null,
    termName: null
};

export default function ClassForm({ setModalOpen, handleSave, toEdit = {} }) {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [terms, setTerms] = useState([]);


    const isEdit = Boolean(toEdit?.classId);


    //function to know if ClassManager is being editted
   
    useEffect(() => {
        if (!isEdit) return;

        setForm({
            ...toEdit,
            startDate: toEdit.startDate?.split("T")[0] || "",
            endDate: toEdit.endDate?.split("T")[0] || "",
        });

    }, [isEdit, toEdit]);

    
    const loadTeachers = async (inputValue) => {
        if (inputValue.length < 3) return [];

        // Replace with real API call
        const res = await fetch(`/api/teachers?search=${inputValue}`);
        const data = [
            { teacherId: 1, teacherName: "Bola Gosh" },
            { teacherId: 2, teacherName: "Samuel Adeyemi" }
        ]
//            await res.json();

        return data.map(t => ({
            id: t.teacherId,
            name: t.teacherName
        }));
    };



    const loadTerms = async (inputValue) => {
        if (inputValue.length < 2) return [];

        const res = await fetch(`/api/terms?search=${inputValue}`);
        const data = [
            { termId: 100, termName: "Fall 2025" },
            { termId: 101, termName: "Spring 2026" }
        ]
        //await res.json();

        return data.map(t => ({
            id: t.termId,
            name: t.termName
        }));
    };


    const loadCourses = async (inputValue) => {
        if (inputValue.length < 3) return [];

        const res = await fetch(`/api/courses?search=${inputValue}`);
        const data = [
            { courseId: 10, courseName: "Mathematics" },
            { courseId: 11, courseName: "Physics" }
        ]  //await res.json();


        return data.map(c => ({
            id: c.courseId,
            name: c.courseName
        }));
    };


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }));      

    };

    const updateField = (field, value) => {
        setForm(prev => ({
            ...prev,
            [`${field}Id`]: value.id,
            [`${field}Name`]: value.name
        }));
    };

    const validate = () => {
        let err = {};
        if (!form.courseId) err.courseId = "Required";
        if (!form.termId) err.termId = "Required";
        if (!form.teacherId) err.teacherId = "Required";
        if (!form.sectionCode) err.sectionCode = "Required";
        if (!form.startDate) err.startDate = "Required";
        if (!form.endDate) err.endDate = "Required";
        if (!form.maxStudents) err.maxStudents = "Required";
        if (!form.status) err.status = "Required";
        return err;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let err = validate();
        setErrors(err);

        if (Object.keys(err).length === 0) {           

            const payload = {
                ...form
            };

            handleSave(payload);
        }
    };

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle tag="h5">{isEdit ? "Edit Class" : "Add New Class"}</CardTitle>
            </CardHeader>
            <CardBody>
                <Form className="p-6 space-y-6 general-small-font" onSubmit={handleSubmit}>
                    
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <AsyncComboBox
                                    label="Course"
                                    placeholder="Search course (min 3 chars)"
                                    loadOptions={loadCourses}
                                        value={form.courseId
                                            ? { id: form.courseId, name: form.courseName }
                                            : null}
                                    onChange={val => updateField("course", val)}
                                    getOptionLabel={opt => opt.name}
                                    getOptionValue={opt => opt.id}
                                    />
                                    {errors.courseId && <small className="text-danger">{errors.courseId}</small>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <AsyncComboBox
                                    label="Term"
                                    placeholder="Search term (min 3 chars)"
                                    loadOptions={loadTerms}
                                        value={form.termId
                                            ? { id: form.termId, name: form.termName }
                                            : null}
                                    onChange={val => updateField("term", val)}
                                    getOptionLabel={opt => opt.name}
                                    getOptionValue={opt => opt.id}
                                    />
                                    {errors.termId && <small className="text-danger">{errors.termId}</small>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Section Code</Label>
                                <Input
                                    name="sectionCode"
                                    value={form.sectionCode || ""}
                                    onChange={handleChange}
                                    />
                                    {errors.sectionCode && <small className="text-danger">{errors.sectionCode}</small>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <AsyncComboBox
                                    label="Teacher"
                                    placeholder="Search teacher (min 3 chars)"
                                    loadOptions={loadTeachers}
                                        value={form.teacherId
                                            ? { id: form.teacherId, name: form.teacherName }
                                            : null}
                                    onChange={val => updateField("teacher", val)}
                                    getOptionLabel={opt => opt.name}
                                    getOptionValue={opt => opt.id}
                                    />
                                    {errors.teacherId && <small className="text-danger">{errors.teacherId}</small>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>
                                    <FaCalendarAlt className="mr-1" />
                                     Start Date
                                </Label>
                                <Input
                                    name="startDate"
                                    value={form.startDate || ""}
                                    onChange={handleChange}
                                    type="date"
                                    />
                                    {errors.startDate && <small className="text-danger">{errors.startDate}</small>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                    <Label>
                                        <FaCalendarAlt className="mr-1" />
                                        End Date
                                    </Label>
                                <Input
                                    name="endDate"
                                    value={form.endDate || ""}
                                    onChange={handleChange}
                                    type="date"
                                    />
                                    {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Max Students</Label>
                                <Input
                                    name="maxStudents"
                                    value={form.maxStudents || ""}
                                    onChange={handleChange}
                                    type="number"
                                    />
                                    {errors.maxStudents && <small className="text-danger">{errors.maxStudents}</small>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Status</Label>
                                <Input
                                    name="status"
                                    type="select"
                                    value={form.status || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Planned">Planned</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Input>
                                {errors.status && <small className="text-danger">{errors.status}</small>}
                            </FormGroup>
                        </Col>
                    </Row>
                        
                    <div className="row mt-3">
                        <div className="col-6">
                            <Button color="danger" type="submit" className="w-100">
                                <FaSave className="me-2" /> Save
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button color="secondary" onClick={() => setModalOpen(false)} className="w-100">
                                <FaTimes className="me-2" /> Cancel
                            </Button>
                        </div>
                    </div>
                        
                    </Form>
            </CardBody>
        </Card>
        </>
        
        
    );

}
