/* src/components/ClassManager.jsx */
import Body from "../../../components/Panels/Body";
import React, { useState, useCallback, useMemo } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Badge,
    Alert,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUserGraduate, FaCalendarAlt, FaFileImport, FaFileExport, FaDownload } from "react-icons/fa";
ModuleRegistry.registerModules([AllCommunityModule]);

const initialRows = [
    {
        "classId": 1001,
        "organizationId": 1,
        "organizationName": "XYZ School",
        "courseId": 101,
        "courseName": "MTH-204",
        "termId": 20251,
        "termName": "Fall-2025",
        "sectionCode": "A",
        "startDate": "2025-09-01",
        "endDate": "2025-12-15",
        "teacherId": 201,
        "teacherName": "Bola Gosh",
        "maxStudents": 40,
        "status": "Active"
    },
    {
        "classId": 1002,
        "organizationId": 1,
        "organizationName": "XYZ School",
        "courseId": 102,
        "courseName": "PHY-110",
        "termId": 20251,
        "termName": "Fall-2025",
        "sectionCode": "B",
        "startDate": "2025-09-01",
        "endDate": "2025-12-15",
        "teacherId": 202,
        "teacherName": "Samuel Adeyemi",
        "maxStudents": 35,
        "status": "Active"
    },
    {
        "classId": 1003,
        "organizationId": 2,
        "organizationName": "ABC College",
        "courseId": 205,
        "courseName": "CSC-301",
        "termId": 20252,
        "termName": "Winter-2026",
        "sectionCode": "A",
        "startDate": "2026-01-10",
        "endDate": "2026-04-20",
        "teacherId": 203,
        "teacherName": "Grace Okonkwo",
        "maxStudents": 45,
        "status": "Planned"
    },
    {
        "classId": 1004,
        "organizationId": 2,
        "organizationName": "ABC College",
        "courseId": 210,
        "courseName": "ENG-150",
        "termId": 20252,
        "termName": "Winter-2026",
        "sectionCode": "C",
        "startDate": "2026-01-10",
        "endDate": "2026-04-20",
        "teacherId": 204,
        "teacherName": "Aisha Bello",
        "maxStudents": 30,
        "status": "Inactive"
    }
]


/* ---------- tiny helpers ---------- */
const newEmptyRow = () => ({
    ClassId: Date.now(), // quick unique id
    OrganizationId: 1,
    CourseId: "",
    TermId: "",
    SectionCode: "",
    StartDate: "",
    EndDate: "",
    TeacherId: "",
    MaxStudents: 30,
    Status: "Active",
});

/* ---------- the component ---------- */
export default function ClassManager() {
    const [rows, setRows] = useState(initialRows);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(newEmptyRow());
    const [isEdit, setIsEdit] = useState(false);

    /* ---- grid columns ---- */
    const columnDefs = useMemo(
        () => [
           
            {
                headerName: "Class",
                field: "className",
                width: 100,
                filter: "agNumberColumnFilter",
            },
            { headerName: "Course", field: "courseName", width: 150 },
            { headerName: "Term", field: "termName", width: 130 },
            { headerName: "Section", field: "sectionCode", width: 110 },
            {
                headerName: "Dates",
                field: "startDate",
                width: 200,
                valueGetter: (p) =>
                    `${p.data.startDate} -- ${p.data.endDate}`,
            },
            { headerName: "Teacher", field: "teacherName", width: 120 },
            {
                headerName: "Capacity",
                field: "maxStudents",
                width: 120,
                filter: "agNumberColumnFilter",
            },
            {
                headerName: "Status",
                field: "status",
                width: 150,
                cellRenderer: (p) => (
                    <Badge
                        color={p.value === "Active" ? "success" : "secondary"}
                        className="w-100"
                    >
                        {p.value}
                    </Badge>
                ),
            },
            {
                headerName: "",
                field: "actions",
                width: 120,
                cellRenderer: (p) => (
                    <>
                        <Button
                            color="warning"
                            size="sm"
                            className="me-1"
                            onClick={() => handleEdit(p.data)}
                        >
                            <FaEdit />
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(p.data.ClassId)}
                        >
                            <FaTrash />
                        </Button>
                    </>
                ),
                suppressMenu: true,
                sortable: false,
                filter: false,
            }
        ],
        []
    );

    const gridStyle = useMemo(() => ({ width: "100%", height: "72vh" }), []);

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: true,
            resizable: true,
        }),
        []
    );

    /* ---- crud handlers ---- */
    const toggleModal = useCallback(() => setModal((m) => !m), []);

    const handleEdit = (row) => {
        setForm({ ...row });
        setIsEdit(true);
        toggleModal();
    };

    const handleDelete = (id) => {
        setRows((prev) => prev.filter((r) => r.ClassId !== id));
    };

    const handleAdd = () => {
        setForm(newEmptyRow());
        setIsEdit(false);
        toggleModal();
    };

    const handleSave = () => {
        if (isEdit) {
            setRows((prev) =>
                prev.map((r) => (r.ClassId === form.ClassId ? form : r))
            );
        } else {
            setRows((prev) => [...prev, { ...form, ClassId: Date.now() }]);
        }
        toggleModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    /* ---------- render ---------- */
    return (
        <Body className="my-4">

            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                        <FaUserGraduate className="me-2" />
                        Class Manager
                    </h4>
                    <Button size="sm" color="primary"
                        title="Download Template"
                        style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
                        onClick={handleAdd}>
                        <FaDownload className="me-1" /> Download Template
                    </Button>
                </CardHeader>

                <CardBody className="bg-secondary">
                    <div className="ag-theme-alpine row" >

                        <div className="col-6 py-2 text-left" >
                            <div className="d-flex gap-2">
                                <Button size="sm" color="primary" title="Add Question" style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }} ><FaPlus className="me-1" /></Button>
                                <Button size="sm" color="secondary" title="Import CSV" style={{ backgroundColor: "#64748b", borderColor: "#64748b" }} > <FaFileImport className="me-1" /></Button>
                                <Button size="sm" color="success" title="Export Excel" style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}><FaFileExport className="me-1" /></Button>
                            </div>
                        </div>
                        <div className="col-12" style={gridStyle}>
                            <AgGridReact
                                rowData={rows}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                animateRows
                                pagination={true}
                                paginationPageSize={15}
                                paginationPageSizeSelector={[10, 15, 20]}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* ---------- modal form ---------- */}
            <Modal isOpen={modal} toggle={toggleModal} size="lg">
                <ModalHeader toggle={toggleModal}>
                    {isEdit ? "Edit Class" : "Add New Class"}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Course Id</Label>
                                    <Input
                                        name="CourseId"
                                        value={form.CourseId}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Term Id</Label>
                                    <Input
                                        name="TermId"
                                        value={form.TermId}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Section Code</Label>
                                    <Input
                                        name="SectionCode"
                                        value={form.SectionCode}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Teacher Id</Label>
                                    <Input
                                        name="TeacherId"
                                        value={form.TeacherId}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>
                                        <FaCalendarAlt className="me-1" />
                                        Start Date
                                    </Label>
                                    <Input
                                        name="StartDate"
                                        value={form.StartDate}
                                        onChange={handleChange}
                                        type="date"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>End Date</Label>
                                    <Input
                                        name="EndDate"
                                        value={form.EndDate}
                                        onChange={handleChange}
                                        type="date"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Max Students</Label>
                                    <Input
                                        name="MaxStudents"
                                        value={form.MaxStudents}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        name="Status"
                                        type="select"
                                        value={form.Status}
                                        onChange={handleChange}
                                    >
                                        <option>Active</option>
                                        <option>Planned</option>
                                        <option>Cancelled</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={handleSave}>
                        <FaSave className="me-2" />
                        Save
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleModal}>
                        <FaTimes className="me-2" />
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Body>
    );
}