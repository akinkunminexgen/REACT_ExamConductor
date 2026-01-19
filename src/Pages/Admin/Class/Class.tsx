/* src/components/ClassManager.jsx */
import Body from "../../../components/Panels/Body";
import QuestionForm from "../../../components/AdminComponent/ClassForm";
import React, { useState, useCallback, useMemo } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Label,
    Input,
    Badge,
    Alert,
} from "reactstrap";
import Modal from "react-modal";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef, ValueGetterParams } from "ag-grid-community";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUserGraduate, FaCalendarAlt, FaFileImport, FaFileExport, FaDownload } from "react-icons/fa";
import ClassForm from "../../../components/AdminComponent/ClassForm";
import ErrorMessage from "../../../components/Error";
import { useLoading } from "../../../context/LoadingContext";
import GlobalLoader from "../../../components/Common/GlobalLoader";
import { downloadCSV } from "../../../helper/CsvHelper";
import type { ClassDto } from "../../../types/ClassDto";

ModuleRegistry.registerModules([AllCommunityModule]);

const initialRows: ClassDto[] = [
    {
        "classId": 1001,
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


export default function ClassManager() {

    const { loading, setLoading } = useLoading();
    const [rowData, setRowData] = useState<ClassDto[]>(initialRows);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState<ClassDto | null>(null);
    const [modalIsOpenToEdit, setModalIsOpenToEdit] = useState<boolean>(false);
    const [modalIsOpenToCreate, setModalIsOpenToCreate] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    /* ---- grid columns ---- */
    const columnDefs = useMemo<ColDef<ClassDto>[]>(() => [
        {
            headerName: "Course",
            field: "courseName",
            floatingFilter: true
        },
        {
            headerName: "Term",
            field: "termName",
            floatingFilter: true
        },
        {
            headerName: "Section",
            field: "sectionCode"
        },
        {
            headerName: "Dates",
            valueGetter: (p: ValueGetterParams<ClassDto>) =>
                `${p.data?.startDate} -- ${p.data?.endDate}`
        },
        {
            headerName: "Teacher",
            field: "teacherName"
        },
        {
            headerName: "Capacity",
            field: "maxStudents",
            filter: "agNumberColumnFilter"
        },
        {
            headerName: "Status",
            field: "status",
            cellRenderer: (p: { value: ClassDto["status"] }) => (
                <Badge color={p.value === "Active" ? "success" : "secondary"}>
                    {p.value}
                </Badge>
            )
        },
        {
            headerName: "",
            width: 120,
            cellRenderer: (p: { data: ClassDto }) => (
                <>
                    <Button
                        size="sm"
                        color="warning"
                        onClick={() => handleEdit(p.data)}
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(p.data.classId)}
                    >
                        <FaTrash />
                    </Button>
                </>
            ),
            sortable: false,
            filter: false
        }
    ], []);


    const gridStyle = useMemo(() => ({ width: "100%", height: "72vh" }), []);

    const defaultColDef = useMemo(
        () => ({
            floatingFilter: true,
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 100
        }),
        []
    );


    const handleEdit = (row: ClassDto): void => {
        setForm({ ...row });
        setModalIsOpenToEdit(true)
    };

    const handleDelete = (id: number): void => {
        setRowData((prev) => prev.filter((r) => r.classId !== id));
    };

    const TemplateDownloader = (): void => {
        const getOneRowData = rowData; //to always get template;
        downloadCSV(getOneRowData, "Class_Template");
    };

    const handleSave = async (data: ClassDto): Promise<void> => {
        setLoading(true);

        try {
            const response = await fetch(`/api/classmanager/${data.classId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("Save failed");

            const updatedClass: ClassDto = await response.json();

            setRowData(prev => {
                const exists = prev.some(c => c.classId === updatedClass.classId);
                return exists
                    ? prev.map(c => c.classId === updatedClass.classId ? updatedClass : c)
                    : [...prev, updatedClass];
            });

            setModalIsOpenToEdit(false);
            setModalIsOpenToCreate(false);
            setError(null);
        } catch {
            setError("Failed to add Class");
        } finally {
            setLoading(false);
        }
    };


    

    /* ---------- render ---------- */
    return (
        <>
            {loading && <GlobalLoader />}
            {error && (
                <ErrorMessage errorMessage={error} />
            )}
            <Body>

                <Card>
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                            <FaUserGraduate className="me-2" />
                            Class Manager
                        </h4>
                        <Button size="sm" color="primary"
                            title="Download Template"
                            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
                            onClick={TemplateDownloader}
                            >
                            <FaDownload className="me-1" /> Download Template
                        </Button>
                    </CardHeader>

                    <CardBody className="bg-secondary">
                        <div className="ag-theme-alpine row" >

                            <div className="col-6 py-2 text-left" >
                                <div className="d-flex gap-2">
                                <Button size="sm" color="primary" title="Add Question" style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }} onClick={() => setModalIsOpenToCreate(true)} ><FaPlus className="me-1" /></Button>
                                    <Button size="sm" color="secondary" title="Import CSV" style={{ backgroundColor: "#64748b", borderColor: "#64748b" }} > <FaFileImport className="me-1" /></Button>
                                    <Button size="sm" color="success" title="Export Excel" style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}><FaFileExport className="me-1" /></Button>
                                </div>
                            </div>
                            <div className="col-12" style={gridStyle}>
                                <AgGridReact
                                    rowData={rowData}
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

                {/* ---------- modal form for creating---------- */}
                <Modal
                    isOpen={modalIsOpenToCreate}
                    style={{ content: { width: "50%", maxWidth: "700px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                    onRequestClose={() => setModalIsOpenToCreate(false)}
                    contentLabel="Create Class"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                >
                    <ClassForm setModalOpen={setModalIsOpenToCreate} handleSave={handleSave } />
                </Modal>
                {/* ---------- modal form for Editing---------- */}
                <Modal
                    isOpen={modalIsOpenToEdit}
                    style={{ content: { width: "50%", maxWidth: "700px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                    onRequestClose={() => setModalIsOpenToEdit(false)}
                    contentLabel="Edit Class"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                >
                    <ClassForm setModalOpen={setModalIsOpenToEdit} handleSave={handleSave}  toEdit={form} />
                </Modal>
            </Body>
        </>
        
    );
}