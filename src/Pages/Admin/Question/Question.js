import Body from "../../../components/Panels/Body";
import InputText from "../../../components/InputText";
import QuestionForm from "../../../components/AdminComponent/QuestionForm";
import { FaDownload, FaTimes, FaEdit, FaPlus, FaFileImport, FaFileExport } from "react-icons/fa";
import { adminQuestionLoad, exam } from '../../../Data';
import { useEffect, useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Modal from "react-modal";
import Error from "../../../components/Error";
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { downloadCSV } from "../../../helper/CsvHelper";
import GlobalLoader from "../../../components/Common/GlobalLoader";
import { useLoading } from "../../../context/LoadingContext";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function Question() {
    
   
    const { loading, setLoading } = useLoading();
    const [rowData, setRowData] = useState([]);
    const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
    const [modalIsOpenForCreate, setModalIsOpenForCreate] = useState(false);
    const [modalIsOpenForCsv, setModalIsOpenForCsv] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState([]);
    const [retrieveOptions, setRetrieveOptions] = useState({A : []});
    const [studentName, setStudentName] = useState("");
    const [error, setError] = useState(null);
    const [csvFile, setCsvFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setRowData(adminQuestionLoad);
    }, []);


    const importCsv = () => {
        setCsvFile(null)
        setModalIsOpenForCsv(true);
        setError(null);
        return;
    }


    const handleAQuestion = useCallback((question) => {
        setSelectedQuestion({ ...question });
        setModalIsOpenForEdit(true);
    }, []);



    const TemplateDownloader = () => {
        const getOneRowData = rowData; //to always get template;
        downloadCSV(getOneRowData, "Question_Template");
    };

    const dataSource = {
        getRows: async (params) => {
            const { request } = params;

            const res = await fetch('/api/questions/search', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request)   // include filters, sorting, pagination!
            });

            const data = await res.json();

            params.success({
                rowData: data.rows,        // actual records
                rowCount: data.totalCount  // total count in database
            });
        }
    }; //this is for server rendering which is an enterprise version

    const handleCsvSave = async () => {
        const file = csvFile;
        if (!file) {
            setError("Please upload a CSV file.");
            return
        }
        if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
            setError("Please upload a valid CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", csvFile);

        try
        {
            setUploading(true);
            const response = await fetch(`/api/questions/upload-csv/`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok)
                throw new Error("Failed to save the question.");

            const updatedQuestion = await response.json();
            //data has to be inserted into set rowData
            setRowData(updatedQuestion);

            //console.log("Response:", response.data);
        } catch (error) {
            setError("Error uploading CSV file.");
            setModalIsOpenForCsv(false);
        } finally {
            setUploading(false);
            setModalIsOpenForCsv(false);
        }
    };


    const handleSave = async (theQuestion) => {
        try {
            const response = await fetch(`/api/questions/add/${theQuestion.questionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(theQuestion),
            });

            if (!response.ok) 
                throw new Error("Failed to save the question.");

            const updatedQuestion = await response.json();

            setRowData(prev => {
                const exists = prev.some(q => q.questionId === updatedQuestion.questionId);

                if (exists) {
                    return prev.map(q =>
                        q.questionId === updatedQuestion.questionId ? updatedQuestion : q
                    );
                } else {
                    // Add new question
                    return [...prev, updatedQuestion];
                }
            });

            // Close modal
            setModalIsOpenForEdit(false);
            setError(null);
        } catch (err) {

            //this to be removed later-just for testing
            setRowData(prev => {
                const exists = prev.some(q => q.questionId === theQuestion.questionId);

                if (exists) {
                    return prev.map(q =>
                        q.questionId === theQuestion.questionId ? theQuestion : q
                    );
                } else {
                    // Add new question
                    return [...prev, theQuestion];
                }
            });
            console.error("Error saving question:", rowData);
            setError((prev) => `errorihfkehidfvnhj${theQuestion.questionId}`);
            //setModalIsOpenForCreate(false);
        }
    };

    const handleDelete = useCallback(async (theQuestion) => {
        try {
            const response = await fetch(`/api/questions/delete/${theQuestion.questionId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(theQuestion),
            });

            if (!response.ok)
                throw new Error("Failed to save the question.");

            const deleteQuestion = await response.json();

            setRowData((prev) =>
                prev.filter(p =>
                    p.questionId !== theQuestion.questionId));

            setError(null);
        } catch (err) {
            setRowData((prev) =>
                prev.filter(p =>
                    p.questionId !== theQuestion.questionId));

            console.error("Error saving question:", rowData);
            setError((prev) => `errorihfkehidfvnhj${theQuestion.questionId}`);
        }
    }, []);



    const maxOptions = Math.max(...adminQuestionLoad.map(q => q?.options?.length ?? 0));

    const optionColumns = Array.from({ length: maxOptions }, (_, i) => ({
        headerName: String.fromCharCode(65 + i), // 'A', 'B', 'C', 'D', 'E',
        minWidth: 60,
        valueGetter: (params) => params.data.options?.[i]?.label || ""
    }));

    

    const gridStyle = useMemo(() => ({ width: "100%", height: "80vh" }), []);

    const [columnDefs, setColumnDefs] = useState([
        { field: "questionId", headerName: "Quest Id.", width: 30, pinned: "left", lockPinned: true, cellClass: "lock-pinned", },
        { field: "text", headerName: "Question", minWidth: 600, maxWidth: 900, pinned: "left" },
        {
            field: "tag",
            headerName: "Tag",
            filter: "agTextColumnFilter",
            floatingFilter: true,  // inline filter UI
            width: 140
        },
        ...optionColumns,
        {
            field: "AssignedExams",
            headerName: "Edit Question",
            pinned: "right",
            width: 60,
            cellRenderer: (params) => (
                <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleAQuestion(params.data)}
                    >
                        <FaEdit />
                    </Button>

                    <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(params.data)}
                    >
                        <FaTimes />
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
        <>
         {loading && <GlobalLoader />}
         { error && (
            <Error errorMessage={error} />
        )}
       
       
            <Body>
                <div className="ag-theme-alpine row" >

                    <div className="col-6 py-2 text-left" >
                        <div className="d-flex gap-2">
                            <Button size="sm" color="primary" title="Add Question" style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }} onClick={() => setModalIsOpenForCreate(true)}><FaPlus className="me-1" /></Button>
                            <Button size="sm" color="secondary" title="Import CSV" style={{ backgroundColor: "#64748b", borderColor: "#64748b" }} onClick={importCsv}> <FaFileImport className="me-1" /></Button>
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
                            //rowModelType="serverSide"
                            //serverSideDatasource={dataSource}
                        />
                    </div>
                </div>

                {/* this is the Importing questions from CSV */}
                <Modal
                    isOpen={modalIsOpenForCsv}
                    style={{ content: { width: "50%", maxWidth: "700px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                    onRequestClose={() => setModalIsOpenForCreate(false)}
                    contentLabel="Create Question"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                >
                    <div className="p-3">
                        <h5 className="mb-3">Import Questions</h5>

                        {/* Error Toast */}
                        <Error errorMessage={error} />

                        <Form>
                            {/* Question Text */}
                            <FormGroup>
                                <Label for="text">Upload file</Label>
                                <Input
                                    type="file"
                                    name="text"
                                    id="text"
                                    onChange={(e) => {
                                        const file = e.target.files[0];                                        
                                        setCsvFile(file);                                      
                                    }}
                                    style={{
                                        fontSize: "0.9rem",
                                    }}
                                    placeholder="Enter your question here"
                                />
                            </FormGroup>
                            < div className="d-flex justify-content-end gap-2 mt-3">
                                <Button color="secondary" onClick={() => setModalIsOpenForCsv(false)}>Cancel</Button>
                                {csvFile && (                        
                                    <Button color="primary" onClick={handleCsvSave}>{uploading ? "Uploading..." : "Upload CSV"}</Button>
                                )}
                            </div>
                           
                        </Form>
                    </div>
                </Modal>


                {/* this is the Create question Modal */}
                <Modal
                    isOpen={modalIsOpenForCreate}
                    style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                    onRequestClose={() => setModalIsOpenForCreate(false)}
                    contentLabel="Create Question"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                >
                    <QuestionForm
                        setModalOpen={setModalIsOpenForCreate}
                        handleSave={handleSave}
                        rowDataLength={rowData?.length}
                    />
                </Modal>

                {/* this is the end */}

                {/* this is the Edit question Modal */}
                <Modal isOpen={modalIsOpenForEdit}
                    style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                    onRequestClose={() => setModalIsOpenForEdit(false)}
                    contentLabel="Edit Question"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay">
                    {selectedQuestion && (
                        <QuestionForm
                            setModalOpen={setModalIsOpenForEdit}
                            handleSave={handleSave}
                            rowDataLength={rowData?.length}
                            toEdit={selectedQuestion}
                        />
                       
                    )}
                </Modal>  
                {/* The end for Editing questions */}
            </Body>
        </>
    );
}