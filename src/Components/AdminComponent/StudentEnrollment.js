import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Spinner
} from "reactstrap";
import { FaUserGraduate, FaBook, FaSave } from "react-icons/fa";

export default function StudentEnrollment({ setModalOpen, student }) {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState({
        availableCourses: [],
        enrolledCourses: []
    });

    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courseSearch, setCourseSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

 
    // Simulate API load
    useEffect(() => {
        // Fetch students
        setStudents([
            { id: 1, name: "Akin" }
        ]);

        // Fetch courses
        setCourses({
            "availableCourses": [
                { id: 109, title: "Geography" },
                { id: 110, title: "Fine Art" },
                { id: 113, title: "Yoruba" },
                { id: 119, title: "Electrical" },
                { id: 120, title: "Computing Science" },
                { id: 123, title: "Economics" },
                { id: 129, title: "URP" },
                { id: 130, title: "Engagement" },
                { id: 133, title: "Social Media" },
            ],
            "enrolledCourses": [
                { id: 101, title: "Mathematics" },
                { id: 102, title: "Physics" },
                { id: 103, title: "Chemistry" },
            ]
        });
    }, []);

    const filteredCourses = courses.availableCourses?.filter(c =>
        c.title.toLowerCase().includes(courseSearch.toLowerCase())
    ) || [];

    const chooseCourses = (id) => {
        setSelectedCourses(prev =>
            prev.includes(String(id))
                ? prev.filter(x => x !== String(id))
                : [...prev, String(id)]
        )
        //console.log(selectedCourses);
    }

    const enrollStudent = async () => {

        if (selectedCourses.length === 0) {
            return setMessage({ type: "error", text: "Select at least one course!" });
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`/api/courses/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentId: student.Id,
                    courseIds: selectedCourses
                }),
            });

            if (!response.ok)
                throw new Error("Failed to save the question.");

            setMessage({ type: "success", text: "Student enrolled successfully!" });
        } catch (err) {

            //take it out when you have the api
            setCourses(prev => {
                const newlyEnrolled = prev.availableCourses.filter(c =>
                    selectedCourses.includes(String(c.id))
                );

                return {
                    ...prev,

                    availableCourses: prev.availableCourses.filter(
                        c => !selectedCourses.includes(String(c.id))
                    ),

                    enrolledCourses: [
                        ...prev.enrolledCourses,
                        ...newlyEnrolled
                    ]
                };
            });

            setMessage({ type: "error", text: "Enrollment failed!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card className="shadow-sm">
                <CardHeader className="bg-light">
                    <h5 className="mb-0 d-flex align-items-center gap-2">
                        <FaUserGraduate />
                        Enroll {student.FullName}
                    </h5>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label className="fw-semibold d-flex align-items-center gap-2">
                            <FaBook />
                            Courses
                        </Label>

                        {/* Search box */}
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={courseSearch}
                            onChange={(e) => setCourseSearch(e.target.value)}
                            className="mb-2"
                        />

                        {/* Checkbox list */}
                        <Card className="shadow-sm">
                            <CardBody style={{ maxHeight: "240px", overflowY: "auto" }}>
                                {filteredCourses.length === 0 && (
                                    <div className="text-muted text-center py-3">
                                        No courses found
                                    </div>
                                )}

                                {filteredCourses.map(c => (
                                    <FormGroup
                                        check
                                        key={c.id}
                                        className="py-2 border-bottom"
                                    >
                                        <Label check className="w-100 cursor-pointer">
                                            <Input
                                                type="checkbox"
                                                value={c.id}
                                                checked={selectedCourses.includes(String(c.id))}
                                                onChange={() => chooseCourses(c.id)}
                                            />
                                            <span className="ms-2">{c.title}</span>
                                        </Label>
                                    </FormGroup>
                                ))}
                            </CardBody>
                        </Card>

                        <small className="text-muted">
                            {selectedCourses.length} course(s) selected
                        </small>
                    </FormGroup>
                    {/* SUBMIT */}
                    <div className="d-grid mt-4">
                        <Button color="primary" onClick={enrollStudent}
                            disabled={loading || selectedCourses.length === 0} >
                            {loading ?
                                (<> <Spinner size="sm" className="me-2" /> Enrolling… </>)
                                :
                                (<> <FaSave className="me-2" /> Enroll Student </>)}
                        </Button>
                    </div>
                </CardBody>
                

                <CardBody>
                    {/* Courses Multi-select */}
                    {courses && (<div className="table-responsive mb-4" style={{ fontSize: "12px" }}>
                        <table className="table table-sm table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Enrolled Courses for  {student.studentName}</th>
                                    <th>Date of Enrollment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.enrolledCourses
                                    .map((course, index) => (
                                        <tr key={index}>
                                            <td>{course.title}</td>
                                            <td>{new Date(course.Date).toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}



                </CardBody>
                <CardFooter className="text-end modal-footer">
                    <Button color="danger" onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                </CardFooter>
            </Card>

        </>
       
    );
}
