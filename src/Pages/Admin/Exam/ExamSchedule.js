import Body from "../../../components/Panels/Body";
import Modal from "react-modal";
import { FaPlus, FaEdit, FaEye, FaPen } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle } from "reactstrap";
import ScheduleForm from "../../../components/AdminComponent/ScheduleForm";
import GroupAssignment from "../../../components/AdminComponent/GroupAssignment";
import GlobalLoader from "../../../components/Common/GlobalLoader";
import { useLoading } from "../../../context/LoadingContext";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ExamSchedule() {

    const { loading, setLoading } = useLoading();
    const [rowData, setRowData] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalEditAccess, setModalEditAccess] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        // Replace with API call
        setRowData([
            {
                id: 1,
                examTitle: "Math Test",
                start: "2025-01-12T09:00",
                end: "2025-01-12T10:00",
                accessType: "All Students",
                retakeAllowed: "no",
                classId: "",
                lateAllowed: "no",
                students: ['1001', '1002'],
                maxAttempts: 0,
                lateMinutes: 0,
                durationMinutes: 10,
                shuffleQuestions: false,
                backtrackingAllowed: false,
                passMark: 0,
                totalMarks: 0,
                disableCopyPaste: false,
                disableScreenshots: false
            },
            {
                id: 2,
                examTitle: "English Test",
                start: "2025-01-14T09:00",
                end: "2025-01-14T10:00",
                accessType: "All Students",
                retakeAllowed: "no",
                classId:"jss1",
                lateAllowed: "no",
                students: [],
                maxAttempts: 0,
                lateMinutes: 0,
                durationMinutes: 30,
                shuffleQuestions: true,
                backtrackingAllowed: true,
                passMark: 0,
                totalMarks: 0,
                disableCopyPaste: false,
                disableScreenshots: false
            }
        ]);
    }, []);


    const analyseAccessType = (data) => {
        if (data.classId) return "class";
        if (data.students && data.students.length > 0) return "specific";
        return "all";
    };

    const handleParameters = (data) => {
        const accessType = analyseAccessType(data)

        setSelectedSchedule({
            ...data,
            accessType: accessType
        });
        setModalEdit(true);
    }

    const handleAccess = (data) => {
        setModalEditAccess(true);
        setSelectedSchedule({
            ...data
        });
    }

    const handleSave = async (theQuestion) => {
        try {
            const response = await fetch(`/api/examschedule/add/${theQuestion.questionId}`, {
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
                const exists = prev.some(q => q.id === updatedQuestion.id);

                if (exists) {
                    return prev.map(q =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                    );
                } else {
                    // Add new question
                    return [...prev, updatedQuestion];
                }
            });

            // Close modal
            setModalEdit(false);
            //setError(null);
        } catch (err) {

            //this to be removed later-just for testing
             setRowData(prev => {
                 const exists = prev.some(q => q.id === theQuestion.id);

                if (exists) {
                    return prev.map(q =>
                        q.id === theQuestion.id ? theQuestion : q
                    );
                } else {
                    // Add new question
                    return [...prev, theQuestion];
                }
            });
            
            console.error("Error saving question:", rowData);
          //  setError((prev) => `errorihfkehidfvnhj${theQuestion.questionId}`);
            //setModalIsOpenForCreate(false);
        }
    };

    const gridStyle = useMemo(() => ({ width: "100%", height: "80vh" }), []);

    const columnDefs = [
        { field: "examTitle", headerName: "Exam Title", width: 170, pinned: "left" },
        { field: "start", headerName: "Start Time", valueFormatter: (params) => new Date(params.value).toLocaleString()},
        { field: "end", headerName: "End Time", valueFormatter: (params) => new Date(params.value).toLocaleString() },
        { field: "accessType", headerName: "Access", width: 130 },
        { field: "retakeAllowed", headerName: "Retake Rule", width: 100 },
        { field: "lateAllowed", headerName: "Late Submission", width: 100 },
        { field: "durationMinutes", headerName: "Timer", width: 100 },
        { field: "shuffleQuestions", headerName: "Randomized", width: 100 },
        { field: "passMark", headerName: "Pass Mark", width: 120 },
        { field: "totalMarks", headerName: "Total Mark", width: 120},
        {
            field: "actions",
            headerName: "Actions",
            pinned:"right",
            width: 80,
            cellRenderer: (params) => (
                <div className="d-flex gap-2">
                    <Button
                        size="sm"
                        title="Edit Exam Schdulw"
                        color="primary"
                        onClick={() => {
                            handleParameters(params.data)
                        }}
                    >
                        <FaEdit />
                    </Button>

                    <Button color="info"
                        title="Assign Exam to Student/Classes/Groups"
                        size="sm" onClick={() => handleAccess(params.data)}>
                        <FaPen />
                    </Button>
                </div>
            )
        }
    ];

    return (
         <>
            {loading && <GlobalLoader />}
            <Body>
                <div className="ag-theme-alpine row">

                    {/* Top actions */}
                    <div className="col-12 py-2 text-left">
                        <Button
                            size="sm"
                            color="primary"
                            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
                            onClick={() => setModalCreate(true)}
                        >
                            <FaPlus className="me-1" /> Create Schedule
                        </Button>
                    </div>

                    {/* Grid */}
                    <div className="col-12" style={gridStyle}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={{
                                resizable: true,
                                filter: true,
                                sortable: true,
                                floatingFilter: true
                            }}
                            pagination={true}
                            paginationPageSize={10}
                            paginationPageSizeSelector={[10, 15, 20]}
                        />
                    </div>
                </div>

                {/* Create Schedule Modal */}
                <Modal
                    isOpen={modalCreate}
                    onRequestClose={() => setModalCreate(false)}
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                    style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                >
                    <ScheduleForm setModalOpen={setModalCreate}
                        handleSave={handleSave}/>
                </Modal>

                {/* Edit Schedule Modal */}
                <Modal
                    isOpen={modalEdit}
                    onRequestClose={() => setModalEdit(false)}
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                    style={{ content: { width: "80%", maxWidth: "1000px", maxHeight: "90%", margin: "auto", overflow: "auto", padding: "30px" } }}
                >
                    <ScheduleForm setModalOpen={setModalEdit}
                        handleSave={handleSave}
                        toEdit={selectedSchedule} />
                </Modal>


                {/* Assign Access to Exam */}
                <Modal
                    isOpen={modalEditAccess}
                    onRequestClose={() => setModalEditAccess(false)}
                    className="my-modal-content"
                    overlayClassName="my-modal-overlay"
                    style={{ content: { width: "80%", maxWidth: "1400px", maxHeight: "80vh", margin: "auto", overflow: "auto", padding: "30px" } }}
                >
                    <GroupAssignment setModalOpen={setModalEditAccess}
                        exam={selectedSchedule} />
                </Modal>
            </Body>
        </>
        
    );
}
