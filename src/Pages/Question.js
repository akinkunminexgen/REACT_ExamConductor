import Body from "../Components/Panels/Body";
import { FaEdit } from "react-icons/fa";
import { adminQuestionLoad, exam } from '../Data';
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Modal from "react-modal";
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardFooter, Button } from "reactstrap";
ModuleRegistry.registerModules([AllCommunityModule]);


export default function Question() {
    
   

    const [rowData, setRowData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedExams, setSelectedExams] = useState([]);
    const [studentName, setStudentName] = useState("");

    useEffect(() => {
        setRowData(adminQuestionLoad);
    }, []);

    const handleShowExams = (exams) => {
        //console.log(exams)
        setSelectedExams(exams);
        setModalIsOpen(true);
    };

    const createStudent = () => {
        return;
    }

    const maxOptions = Math.max(...adminQuestionLoad.map(q => q.options.length));

    const optionColumns = Array.from({ length: maxOptions }, (_, i) => ({
        headerName: String.fromCharCode(65 + i), // 'A', 'B', 'C', 'D', 'E',
        minWidth: 60,
        valueGetter: (params) => params.data.options?.[i]?.label || ""
    }));

    

    const gridStyle = useMemo(() => ({ width: "100%", height: "80vh" }), []);

    const [columnDefs, setColumnDefs] = useState([
        { field: "questionId", headerName: "Quest Id.", width: 30, pinned: "left", lockPinned: true, cellClass: "lock-pinned", },
        { field: "text", headerName: "Question", minWidth: 600, maxWidth: 900, pinned: "left" },
        { headerName: "A", minWidth: 60, valueGetter: (params) => params.data.options?.[0]?.label || "" },
        ...optionColumns,
        {
            field: "AssignedExams",
            headerName: "Assigned Exams",
            pinned: "right",
            width: 60,
            cellRenderer: (params) => (
                <Button color="primary"
                    size="sm" onClick={() => handleShowExams(params.data)}>
                    <FaEdit />
                </Button>
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

                <div className="col-12 py-2" >
                    <div className="d-flex gap-2">
                        <Button color="primary" title="Add Student" onClick={createStudent}>+</Button>
                        <Button size="sm" color="secondary">Import</Button>
                        <Button size="sm" color="success">Export</Button>
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
            <Modal isOpen={modalIsOpen}
                style={{ content: { maxWidth: "90%", maxHeight: "60%", margin: "auto", overflow: "auto" } }}
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