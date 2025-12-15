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
    Input
} from "reactstrap";
import classnames from "classnames";
import { motion } from "framer-motion";

const mockClasses = [
    { id: 1, name: "Math 101" },
    { id: 2, name: "Physics 201" }
];

const mockStudents = [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" },
    { id: 103, name: "Michael Brown" }
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
    onSave = (payload) => console.log("Saved payload:", payload),
    
}) {
    const [activeTab, setActiveTab] = useState("class");
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

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

    return (
        <>
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
                            <div className="col-md-6" key={cls.id}>
                                <Card
                                    onClick={() => setSelectedClass(cls.id)}
                                    className="cursor-pointer"
                                >
                                    <CardBody className="d-flex align-items-center gap-2">
                                        <Input
                                            type="radio"
                                            checked={selectedClass === cls.id}
                                            readOnly
                                        />
                                        <span>{cls.name}</span>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </motion.div>
                </TabPane>

                {/* STUDENTS TAB */}
                <TabPane tabId="students">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="row g-3"
                    >
                        {students.map(s => (
                            <div className="col-md-4" key={s.id}>
                                <Card
                                    onClick={() =>
                                        toggle(selectedStudents, s.id, setSelectedStudents)
                                    }
                                    className="cursor-pointer"
                                >
                                    <CardBody className="d-flex align-items-center gap-2">
                                        <Input
                                            type="checkbox"
                                            checked={selectedStudents.includes(s.id)}
                                            readOnly
                                        />
                                        <span>{s.name}</span>
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
                            <div className="col-md-4" key={g.id}>
                                <Card
                                    onClick={() =>
                                        toggle(selectedGroups, g.id, setSelectedGroups)
                                    }
                                    className="cursor-pointer"
                                >
                                    <CardBody className="d-flex align-items-center gap-2">
                                        <Input
                                            type="checkbox"
                                            checked={selectedGroups.includes(g.id)}
                                            readOnly
                                        />
                                        <span>{g.name}</span>
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
