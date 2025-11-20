import Body from "../../Components/Panels/Body";
import StudentForm  from "../../Components/AdminComponent/StudentForm";
import { student, exam } from '../../Data';
import { FaDownload, FaTimes, FaEdit, FaPlus, FaFileImport, FaFileExport, FaEye } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Modal from "react-modal";
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { downloadCSV } from "../../Helper/CsvHelper";
import Error from "../../Components/Error";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function Student() {
    
   

    const [rowData, setRowData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenForCreate, setModalIsOpenForCreate] = useState(false);
    const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
    const [selectedExams, setSelectedExams] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setRowData(student);
    }, []);

    const handleAStudent = (student) => {
        setSelectedStudent({ ...student });
        setModalIsOpenForEdit(true);
    };

    const handleShowExams = (exams, fullName) => {
        //console.log(exams)
        setSelectedExams(exams);
        setStudentName(fullName);
        setModalIsOpen(true);
    };

    const createStudent = () => {
        setModalIsOpenForCreate(true);
        setError(null);
        return;
    }

    const TemplateDownloader = () => {
        const getOneRowData = rowData; //to always get template;
        downloadCSV(getOneRowData, "Student_Template");
    };
    //console.log(rowData);

    

    const gridStyle = useMemo(() => ({ width: "100%", height: "80vh" }), []);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: "StudentNumber", headerName: "Matric No.", width: 60, pinned: "left", lockPinned: true, cellClass: "lock-pinned", },
        { field: "FullName", headerName: "Full Name", maxWidth: 150, pinned: "left" },
        { field: "Email", headerName: "Email", minWidth: 180 },
        { field: "Grade", headerName: "Grade" },
        { field: "Section", headerName: "Section" },
        { field: "DateOfBirth", headerName: "Date of Birth", valueFormatter: params => new Date(params.value).toLocaleDateString() },
        { field: "Gender", headerName: "Gender" },
        { field: "IsActive", headerName: "Active", cellRenderer: params => params.value ? "Yes" : "No" },
        { field: "IsEligibleForExam", headerName: "Eligible for Exam", cellRenderer: params => params.value ? "Yes" : "No" },
        { field: "EligibilityReason", headerName: "Eligibility Reason" },
        { field: "ParentPhone", headerName: "Parent Contact" },
        { field: "Notes", headerName: "Notes" },
        { field: "LastModified", headerName: "Last Modified", valueFormatter: params => new Date(params.value).toLocaleString() },
        { field: "CreatedBy", headerName: "Created By" },
        { field: "CreatedAt", headerName: "Created At", valueFormatter: params => new Date(params.value).toLocaleString() },
        {
            field: "Exams",
            headerName: "Assigned Exams",
            pinned: "right",
            width: 60,
            cellRenderer: (params) => (

                <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                    <Button
                        color="primary"
                        size="sm"
                        title="Edit Info"
                        onClick={() => handleAStudent(params.data)}
                    >
                        <FaEdit />
                    </Button>

                    <Button color="info"
                        title="View details"
                        size="sm" onClick={() => handleShowExams(params.data.AssignedExams, params.data.FullName)}>
                        <FaEye />
                    </Button>
                </div>
                
            )
        }
    ]);


    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: true,
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 100
        };
    }, []);

    return (
        <Body>
            <div className="ag-theme-alpine row" >

                <div className="col-6 py-2 text-left" >
                    <div className="d-flex gap-2">
                        <Button size="sm" color="primary" title="Add Question" style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }} onClick={createStudent}><FaPlus className="me-1" /></Button>
                        <Button size="sm" color="secondary" title="Import CSV" style={{ backgroundColor: "#64748b", borderColor: "#64748b" }} > <FaFileImport className="me-1" /></Button>
                        <Button size="sm" color="success" title="Export Excel" style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}><FaFileExport className="me-1" /></Button>
                    </div>
                </div>
                <div className="col-6 py-2 text-end" >
                    <div className="d-flex justify-content-end gap-2">
                        <Button size="sm" color="primary"
                            title="Download Template"
                            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
                            onClick={TemplateDownloader}>
                            <FaDownload className="me-1" /> Download Template
                        </Button>
                    </div>
                </div>
                <div className="col-12" style={gridStyle}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={15}
                        paginationPageSizeSelector={[10, 15, 20]}
                    />
                </div>
            </div>

            {/* this is the Create question Modal */}
            <Modal
                isOpen={modalIsOpenForCreate}
                style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                onRequestClose={() => setModalIsOpenForCreate(false)}
                contentLabel="Create Question"
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
            >
                <StudentForm setModalOpen={setModalIsOpenForCreate} />
            </Modal>

            {/* this is the Create question Modal */}
            <Modal
                isOpen={modalIsOpenForEdit}
                style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                onRequestClose={() => setModalIsOpenForEdit(false)}
                contentLabel="Create Question"
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
            >
                <StudentForm setModalOpen={setModalIsOpenForEdit} toEdit={selectedStudent} />
            </Modal>

            {/* this is view student info */}
            <Modal isOpen={modalIsOpen}
                style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Assigned Exams Modal"
                className="my-modal-content"
                overlayClassName="my-modal-overlay">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h5">Assigned Exams for {studentName}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <h6 className="mb-2">Upcoming Assigned Exams</h6>
                        {selectedExams.filter(exam => exam.score == null).length > 0 ? (
                            <div className="table-responsive mb-4" style={{ fontSize: "12px" }}>
                                <table className="table table-sm table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Scheduled Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedExams
                                            .filter(exam => exam.score == null)
                                            .map((exam, index) => (
                                                <tr key={index}>
                                                    <td>{exam.Subject}</td>
                                                    <td>{new Date(exam.Date).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-muted">No upcoming assigned exams.</p>
                        )}

                        {/* Past Exams */}
                        <h6 className="mb-2">Past Exam Scores</h6>
                        {selectedExams.filter(exam => exam.score != null).length > 0 ? (
                            <div className="table-responsive " style={{ fontSize: "12px" }}>
                                <table className="table table-sm table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Exam Date</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedExams
                                            .filter(exam => exam.score != null)
                                            .map((exam, index) => (
                                                <tr key={index}>
                                                    <td>{exam.Subject}</td>
                                                    <td>{new Date(exam.Date).toLocaleString()}</td>
                                                    <td>
                                                        <span
                                                            className={`badge bg-${exam.score >= 70
                                                                ? "success"
                                                                : exam.score >= 55
                                                                    ? "info"
                                                                    : "warning"
                                                                }`}
                                                        >
                                                            {exam.score}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-muted">No recorded exam scores.</p>
                        )}
                    </CardBody>
                    <CardFooter className="text-end modal-footer">
                        <Button color="danger" onClick={() => setModalIsOpen(false)}>
                            Close
                        </Button>
                    </CardFooter>
                </Card>
            </Modal>            
        </Body>
        
    );
}