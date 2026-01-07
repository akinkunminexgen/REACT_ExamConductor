import { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
    FormGroup,
    Label
} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import classnames from "classnames";
import { motion } from "framer-motion";
import GlobalLoader from "../../components/Common/GlobalLoader";

const mockClasses = [
    { id: 1, name: "Math 101" },
    { id: 2, name: "Physics 201" }
];

const mockStudents = [
    { id: 101, name: "John Doe", enroll: true },
    { id: 102, name: "Jane Smith", enroll: true },
    { id: 103, name: "Michael Brown", enroll: false },
    { id: 104, name: "Jacqleen Woltemadenwy", enroll: true },
    { id: 105, name: "Michael Stone", enroll: false },

];

const mockGroups = [
    { id: 201, name: "Exam Access Group" },
    { id: 202, name: "Assignment Group A" }
];


export default function GroupAssignment({
    setModalOpen,
    classes = mockClasses,
    students = mockStudents,
    groups = mockGroups,
    onSave = (e) => console.log("Saved payload:", e.target),
    
}) {
    const [activeTab, setActiveTab] = useState("class");
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchStudent, setSearchStudent] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const toggle = (list, value, setter) => {
        setter(
            list.includes(value)
                ? list.filter(v => v !== value)
                : [...list, value]
        );
    };

    const handleSave = () => {
        onSave({
            classId: selectedClass,
            studentIds: selectedStudents,
            groupIds: selectedGroups
        });
    };

    const [isSearching, setIsSearching] = useState(false);

    const handleStudentQuery = async () => {
        const trimmedValue = searchStudent.trim();
        setErrors({});

        if (!trimmedValue) {
            setErrors({ searchStudent: "Please enter a student name or email." });
            return;
        }

        if (trimmedValue.length < 3) {
            setErrors({ searchStudent: "Minimum of 3 characters required." });
            return;
        }

        try {
            setLoading(true);

            // Example API call
            await fetchStudents(searchStudent.trim());

        } catch (err) {
            console.error("Search failed", err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading && <GlobalLoader />}
            {/* Tabs */}
            <Nav tabs>
                {["class", "students", "groups"].map(tab => (
                    <NavItem key={tab}>
                        <NavLink
                            className={classnames({ active: activeTab === tab })}
                            onClick={() => setActiveTab(tab)}
                            style={{ cursor: "pointer" }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>

            <TabContent activeTab={activeTab} className="mt-4">
                {/* CLASS TAB */}
                <TabPane tabId="class">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="row g-3"
                    >
                        {classes.map(cls => (
                            <div className="col-md-4 col-12 mb-2 mb-md-0" key={cls.id}>
                                <Card
                                    onClick={() => setSelectedClass(cls.id)}
                                    className={`cursor-pointer class-card ${selectedClass === cls.id ? "selected" : ""
                                        }`}
                                >
                                    <CardBody className="d-flex align-items-center gap-3">
                                        <label
                                            className="fancy-radio"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Input
                                                type="radio"
                                                name="classSelect"
                                                checked={selectedClass === cls.id}
                                                onChange={() => setSelectedClass(cls.id)}
                                            />
                                            <span className="radiomark"></span>
                                            <span className="card-name-data ml-2">{cls.name}</span>
                                        </label>

                                        
                                    </CardBody>
                                </Card>

                            </div>
                        ))}
                    </motion.div>
                </TabPane>

                {/* STUDENTS TAB */}
                <TabPane tabId="students">
                    <FormGroup>
                        <div className="row justify-content-center align-items-center text-center">
                            <div className="col-md-4 col-12 mb-2 mb-md-0">
                                <Input
                                    name="student"
                                    type="text"
                                    value={searchStudent || ""}
                                    onChange={(e) => setSearchStudent(e.target.value)}
                                    placeholder="Search student (min. 3 characters)"
                                />
                                {errors.searchStudent && <small className="text-danger">{errors.searchStudent}</small>}
                            </div>

                            <div className="col-md-2 col-12">
                                <Button
                                    onClick={handleStudentQuery}
                                    className="w-100 fancy-search-btn"
                                >
                                    <span className="me-2"> <FaSearch className="me-2" /></span> Search
                                </Button>
                            </div>
                        </div>
                    </FormGroup>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="row g-3"
                    >
                        
                        {students.map(s => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-2" key={s.id}>
                                <Card
                                    onClick={() =>
                                        toggle(selectedStudents, s.id, setSelectedStudents)
                                    }
                                    className="cursor-pointer student-card"
                                >
                                    <CardBody className="d-flex align-items-center gap-3">
                                        <label
                                            className="fancy-checkbox"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Input
                                                type="checkbox"
                                                checked={selectedStudents.includes(s.id)}
                                                onChange={() =>
                                                    toggle(selectedStudents, s.id, setSelectedStudents)
                                                }
                                            />
                                            <span className="checkmark"> </span>
                                            <span className="card-name-data ml-2"> {s.name}</span>
                                        </label>                                        
                                    </CardBody>
                                </Card>


                            </div>
                        ))}
                    </motion.div>
                </TabPane>

                {/* GROUPS TAB */}
                <TabPane tabId="groups">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="row g-3"
                    >
                        {groups.map(g => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-2" key={g.id}>
                                <Card
                                    onClick={() =>
                                        toggle(selectedGroups, g.id, setSelectedGroups)
                                    }
                                    className="cursor-pointer  student-card"
                                >
                                    
                                    <CardBody className="d-flex align-items-center gap-2">
                                        <label
                                            className="fancy-checkbox"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Input
                                                type="checkbox"
                                                checked={selectedGroups.includes(g.id)}
                                                onClick={() =>
                                                    toggle(selectedGroups, g.id, setSelectedGroups)
                                                }
                                            />
                                            <span className="checkmark"> </span>
                                            <span className="card-name-data ml-2">{g.name}</span>
                                        </label>
                                        
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </motion.div>
                </TabPane>
            </TabContent>
            <div className="row mt-3">
                <div className="col-6">
                    <Button color="danger" onClick={onSave} className="w-100">
                        Save
                    </Button>
                </div>
                <div className="col-6">
                    <Button color="secondary" onClick={() => setModalOpen(false)} className="w-100">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
        
        
    );
}
