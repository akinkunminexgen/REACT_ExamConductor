import { useState, useEffect, useMemo } from "react";
import {
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
    FormGroup,
    Label
} from "reactstrap";
import classnames from "classnames";
import { motion } from "framer-motion";
import SelectableCardItem from "../../components/Card/SelectableCardItem";
import GlobalLoader from "../../components/Common/GlobalLoader";
import SearchBar from "../../components/Common/SearchBar";


const mockClasses = [
    { id: 1, name: "Math 101" },
    { id: 2, name: "Physics 201" }
];

const mockStudents = [
    { id: 101, name: "John Doe", hasAccess: true },
    { id: 102, name: "Jane Smith", hasAccess: true },
    { id: 103, name: "Michael Brown", hasAccess: false },
    { id: 104, name: "Jacqleen Woltemadenwy", hasAccess: true },
    { id: 105, name: "Michael Stone", hasAccess: false },

];

const mockGroups = [
    { id: 201, name: "Exam Access Group", hasAccess: true },
    { id: 202, name: "Assignment Group A", hasAccess: false }
];


export default function GroupAssignment({
    setModalOpen,
    exam
    
}) {
    const [activeTab, setActiveTab] = useState("class");
    const [groups, setGroups] = useState(mockGroups);
    const [students, setStudents] = useState(mockStudents);
    const [classes, setClasses] = useState(mockClasses);
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchStudent, setSearchStudent] = useState("");
    const [searchGroup, setSearchGroup] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [totalCount, setTotalCount] = useState(0);


    const studentArray = useMemo(() => {
        return students
            ?.filter(s => s.hasAccess)
            .map(s => s.id) || [];
    }, [students]);

    const groupArray = useMemo(() => {
        return groups
            ?.filter(g => g.hasAccess)
            .map(g => g.id) || [];
    }, [groups]);

    useEffect(() => {
        setSelectedStudents(studentArray);
    }, [studentArray]);

    useEffect(() => {
        setSelectedGroups(groupArray);
    }, [groupArray]);


    useEffect(() => {
        async function fetchGroups() {
            try {
                const res = await fetch(`/api/groups?limit=30&ExamId=${ exam.id}`);

                if (!res.ok) throw new Error("Failed");

                const data = await res.json();

                setGroups(data.groups);
                setTotalCount(data.totalCount);
            } catch (err) {
                console.error("Failed to load groups", err);
                setTotalCount(151);
            }
        }

        fetchGroups();
    }, []);


    useEffect(() => {
        //showing only direct student that have access to the examSchedule (student in a group or class are exampted)
        async function fetctStudents() {
            try {
                const res = await fetch(`/api/students?ExamId=${exam.id}`);

                if (!res.ok) throw new Error("Failed");

                const data = await res.json();

                setStudents(data.students);
            } catch (err) {
                console.error("Failed to load students", err);;
            }
        }

        fetctStudents();
    }, []);

    useEffect(() => {
        async function fetctClasses() {
            try {
                const res = await fetch("/api/classes");

                if (!res.ok) throw new Error("Failed");

                const data = await res.json();

                setStudents(data.students);
            } catch (err) {
                console.error("Failed to load classes", err);;
            }
        }

        fetctClasses();
    }, []);



    
    const showGroupSearch = totalCount > 30;

    const isSameSet = (a = [], b = []) => {
        if (a.length !== b.length) return true;

        const setA = new Set(a);
        return b.some(id => !setA.has(id));
    };

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


    const handleStudentQuery = async () => {
        var info = {
            url: "/api/students", name: "Student name or email", errorKey: "searchStudent"
        };
        await handleQuery(info, searchStudent, setSearchStudent)
    }

    const handleGroupQuery = async () => {
        var info = {
            url : "/api/groups", name: "Group name", errorKey: "searchGroup"
        };
        await handleQuery(info, searchGroup, setSearchGroup)
    }


    const handleQuery = async (info, state, setter) => {
        const trimmedValue = state.trim();
        setErrors({});

        if (!trimmedValue) {
            setErrors({ [info.errorKey]: "Please enter a "+info.name });
            return;
        }

        if (trimmedValue.length < 3) {
            setErrors({ [info.errorKey]: "Minimum of 3 characters required." });
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `${info.url}?search=${encodeURIComponent(state)}&limit=30`
            );

            if (!res.ok) throw new Error("Search failed");

            const data = await res.json();
            setter(data.items);


        } catch (err) {
            console.error("Search failed", err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    //console.log(selectedStudents.length)
    return (
        <>
            {loading && <GlobalLoader />}
            {/* Tabs */}
            <h3>{exam.examTitle}</h3>
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
                            <SelectableCardItem
                                key={cls.id}
                                id={cls.id}
                                label={cls.name}
                                type="radio"
                                name="classSelect"
                                isSelected={selectedClass === cls.id}
                                onSelect={setSelectedClass}
                                colClass="col-md-4 col-12"
                            />
                        ))}
                    </motion.div>
                </TabPane>

                {/* STUDENTS TAB */}
                <TabPane tabId="students">
                    <FormGroup>
                        <SearchBar
                            value={searchStudent}
                            onChange={setSearchStudent}
                            onSearch={handleStudentQuery}
                            placeholder="Search student (min. 3 characters)"
                            error={errors.searchStudent}
                        />
                    </FormGroup>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="row g-3"
                    >
                        
                        {students.map(s => (
                            <SelectableCardItem
                                key={s.id}
                                id={s.id}
                                label={s.name}
                                type="checkbox"
                                isSelected={selectedStudents.includes(s.id)}
                                onSelect={() =>
                                    toggle(selectedStudents, s.id, setSelectedStudents)
                                }
                                colClass="col-lg-3 col-md-4 col-sm-6"
                            />
                        ))}
                    </motion.div>
                </TabPane>

                {/* GROUPS TAB */}
                <TabPane tabId="groups">
                    {showGroupSearch && (
                        <FormGroup>
                            <SearchBar
                                value={searchGroup}
                                onChange={setSearchGroup}
                                onSearch={handleGroupQuery}
                                placeholder="Search groups (min. 3 characters)"
                                error={errors.searchGroup}
                            />
                        </FormGroup>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="row g-3"
                    >
                        {groups.map(g => (
                            <SelectableCardItem
                                key={g.id}
                                id={g.id}
                                label={g.name}
                                type="checkbox"
                                isSelected={selectedGroups.includes(g.id)}
                                onSelect={() =>
                                    toggle(selectedGroups, g.id, setSelectedGroups)
                                }
                                colClass="col-lg-3 col-md-4 col-sm-6"
                            />
                        ))}
                    </motion.div>
                </TabPane>


            </TabContent>
            <div className="row mt-3">
                <div className="col-6">
                    <Button color="danger" onClick={handleSave} disabled={!isSameSet(selectedStudents, studentArray) && !isSameSet(selectedGroups, groupArray) && !selectedClass} className="w-100">
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
