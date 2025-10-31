import Body from "../Components/Panels/Body";
import InputText from "../Components/InputText";
import { FaDownload, FaTimes, FaEdit, FaPlus, FaFileImport, FaFileExport } from "react-icons/fa";
import { adminQuestionLoad, exam } from '../Data';
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Modal from "react-modal";
import Error from "../Components/Error";
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { downloadCSV } from "../Helper/CsvHelper";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function Question() {
    
   

    const [rowData, setRowData] = useState([]);
    const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
    const [modalIsOpenForCreate, setModalIsOpenForCreate] = useState(false);
    const [modalIsOpenForCsv, setModalIsOpenForCsv] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState([]);
    const [retrieveOptions, setRetrieveOptions] = useState({A : []});
    const [studentName, setStudentName] = useState("");
    const [error, setError] = useState(null);
    const [inputTag, setInputTag] = useState(["A"]);
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

    const createQuestion = () => {
        setModalIsOpenForCreate(true);
        setSelectedQuestion([]);
        setRetrieveOptions({ A: [] });
        setInputTag(["A"]);
        setError(null);
        return;
    }

    const includeInputText = () => {
        const alp = "ABCDEFG";
        const nextChar = alp[inputTag.length];
        //console.log(retrieveOptions);

        if (!nextChar) return;
        setInputTag((prev) => [...prev, nextChar]);
        setRetrieveOptions((prev) => ({...prev, [nextChar] : ["", false] }))
    }

    const toGetOptions = (value, key, forCheckbox=false) => {
        
        let newVal = [];        

        //this logic helps to put both input text and checkbox together
        if (!forCheckbox) {
            newVal = [value, false];
        } else {
            //ensure multiple options can be clicked only if electedQuestion.isCheckBox is true
            if (!selectedQuestion.isCheckbox && value) {
                const confirm = Object.entries(retrieveOptions).some(([key, value]) => value[1] === true);
                if (confirm) {
                    setError("You need to enable multiple answer!");
                    return;
                }
            }
            newVal = [retrieveOptions[key][0], value];
        }
        setRetrieveOptions((p) => ({ ...p, [key]: newVal }));
        return;
    }

    const handleAQuestion = (question) => {
        setSelectedQuestion({ ...question });
        setModalIsOpenForEdit(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuestion((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        setSelectedQuestion((prev) => {
            const updatedOptions = [...prev.options];
            updatedOptions[index].label = value;
            return { ...prev, options: updatedOptions };
        });
    };

    const TemplateDownloader = () => (
        downloadCSV(rowData, [], "Question_Template")
    );

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

    const handleCreateSave = () => {
        const optionArray = Object.entries(retrieveOptions).map((val, i) => ({
            value: val[0],
            label: val[1][0],
            isCorrect: val[1][1],
        }));
        const latestQuestion = {
            ...selectedQuestion, questionId: `Q-${rowData.length}`, options: optionArray || []
        }
        setSelectedQuestion(latestQuestion);
        //console.log(selectedQuestion); still the old state
        handleSave(latestQuestion);
    }

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

            setRowData((prev) =>
                prev.map((q) =>
                    q.questionId === updatedQuestion.questionId ? updatedQuestion : q
                )
            );

            // Close modal
            setModalIsOpenForEdit(false);
            setError(null);
        } catch (err) {
            setRowData((prev) => ([ ...prev, theQuestion ])
               
            );
            console.error("Error saving question:", rowData);
            setError((prev) => `errorihfkehidfvnhj${theQuestion.questionId}`);
            //setModalIsOpenForCreate(false);
        }
    };

    const handleDelete = async (theQuestion) => {
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
    };



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
                        onClick={() => handleD(params.data)}
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
         { error && (
            <Error errorMessage={error} />
        )}
       
       
            <Body>
                <div className="ag-theme-alpine row" >

                    <div className="col-6 py-2 text-left" >
                        <div className="d-flex gap-2">
                            <Button size="sm" color="primary" title="Add Question" style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }} onClick={createQuestion}><FaPlus className="me-1" /></Button>
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
                        />
                    </div>
                </div>

                {/* this is the Importing questions from CSV */}
                <Modal
                    isOpen={modalIsOpenForCsv}
                    style={{ content: { maxWidth: "100%", maxHeight: "65%", margin: "auto", overflow: "auto" } }}
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
                    style={{ content: { maxWidth: "100%", maxHeight: "65%", margin: "auto", overflow: "auto" } }}
                    onRequestClose={() => setModalIsOpenForCreate(false)}
                    contentLabel="Create Question"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                >
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
                                    value={selectedQuestion.text || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "0.9rem",  // optional: smaller font
                                    }}
                                    placeholder="Enter your question here"
                                />
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
                                            value={selectedQuestion.marks || ""}
                                            onChange={handleInputChange}
                                            style={{ width: "100px" }}
                                            className="rounded-3 border-1 shadow-sm px-2 form-control-sm"
                                            placeholder="e.g. 5"
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <Label className="fw-semibold text-secondary mb-0"><i className="bi bi-123 text-primary"> Is it Multiple Answer?</i></Label>
                                    </div>
                                    <div className="col-auto">
                                        <Input
                                            type="checkbox"
                                            name="isCheckbox"
                                            checked={selectedQuestion.isCheckbox || false}
                                            onChange={(e) =>
                                                setSelectedQuestion((prev) => ({ ...prev, isCheckbox: e.target.checked }))
                                            }
                                        />   
                                    </div>                                         
                                                                               
                                </Row> 
                            </FormGroup>

                            <FormGroup >
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
                                        </Col>
                                        {i === inputTag.length-1 &&
                                            <Col sm="3" className="text-end">
                                                <Button
                                                    size="sm"
                                                    color="primary"
                                                    title="Add Student"
                                                    style={{ backgroundColor: "#3d5987", borderColor: "#4f46e5" }}
                                                    onClick={includeInputText}><FaPlus /></Button>
                                            </Col>
                                        }
                                    </Row>
                                ))}
                            </FormGroup>

                            {/* Modal Buttons */}
                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <Button color="secondary" onClick={() => setModalIsOpenForCreate(false)}>Cancel</Button>
                                <Button color="primary" onClick={handleCreateSave}>Save</Button>
                            </div>
                        </Form>
                    </div>
                </Modal>

                {/* this is the end */}

                {/* this is the Edit question Modal */}
                <Modal isOpen={modalIsOpenForEdit}
                    style={{ content: { maxWidth: "100%", maxHeight: "65%", margin: "auto", overflow: "auto" } }}
                    onRequestClose={() => setModalIsOpenForEdit(false)}
                    contentLabel="Edit Question"
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay">
                    {selectedQuestion && (
                        <Form>
                            <h5 className="mb-3">Edit Question</h5>
                            <FormGroup>
                                <Label for="text">Question Text</Label>
                                <Input
                                    type="textarea"
                                    name="text"
                                    rows={4}
                                    font="small"
                                    id="text"
                                    value={selectedQuestion.text}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "0.9rem",  // optional: smaller font
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <div className="form-check form-check-inline">
                                    <Label for="marks" className="fw-semibold text-secondary d-flex align-items-center gap-2">
                                        <i className="bi bi-123 text-primary"></i> Marks Allocated: 
                                    </Label>
                                    <Input
                                        type="number"
                                        name="marks"
                                        id="marks"
                                        value={selectedQuestion.marks}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="5"
                                        className="rounded-3 border-1 shadow-sm px-3"
                                        placeholder="e.g. 5"
                                        style={{ width: "100px" }}
                                        />
                                </div>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <div className="form-check form-check-inline">
                                    <Input
                                        type="checkbox"
                                        name="isCheckbox"
                                        id="isCheckbox"
                                        checked={selectedQuestion.isCheckbox}
                                        onChange={
                                                (e) => {
                                                //console.log(e)
                                                setSelectedQuestion((prev) => ({
                                                    ...prev,
                                                    isCheckbox: e.target.checked,
                                                }))
                                            }                                        
                                        }
                                        className="form-check-input"
                                        style={{ transform: "scale(1.5)", cursor: "pointer" }}
                                    />
                                    <Label
                                        for="isCheckbox"
                                        className="form-check-label fw-semibold text-secondary mb-0"
                                    >
                                        <i className="bi bi-123 text-primary"> Is it Multiple Answer?</i> 
                                    </Label>
                                </div>
                            </FormGroup>
                   
                            {selectedQuestion.options?.map((opt, i) => (
                                <FormGroup key={i}>
                                    <Label>{`Option ${String.fromCharCode(65 + i)}`}</Label>
                                    <Input
                                        type="text"
                                        value={opt.label}
                                        style={{
                                            fontSize: "0.75rem",  // optional: smaller font
                                        }}
                                        onChange={(e) => handleOptionChange(i, e.target.value)}
                                    />
                                </FormGroup>
                            ))}

                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <Button color="secondary" onClick={() => setModalIsOpenForEdit(false)}>Cancel</Button>
                                <Button color="primary" onClick={() => handleSave(selectedQuestion)}>Save</Button>
                            </div>
                        </Form>
                    )}
                </Modal>  
                {/* The end for Editing questions */}
            </Body>
        </>
    );
}