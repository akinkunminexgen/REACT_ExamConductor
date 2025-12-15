import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GroupAssignmentModal({ open, onClose, classes, students, groups, onSave }) {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    const toggle = (list, value, setter) => {
        setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
    };

    const handleSave = () => {
        onSave({
            classId: selectedClass,
            studentIds: selectedStudents,
            groupIds: selectedGroups
        });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">Assign Groups / Access</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="class">
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="class">Class</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="groups">Groups</TabsTrigger>
                    </TabsList>

                    <TabsContent value="class">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4 mt-4">
                            {classes.map(cls => (
                                <Card key={cls.id} className="cursor-pointer" onClick={() => setSelectedClass(cls.id)}>
                                    <CardContent className="flex items-center gap-3 p-4">
                                        <Checkbox checked={selectedClass === cls.id} />
                                        <span>{cls.name}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="students">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4 mt-4">
                            {students.map(s => (
                                <Card key={s.id} onClick={() => toggle(selectedStudents, s.id, setSelectedStudents)}>
                                    <CardContent className="flex gap-3 p-3 items-center">
                                        <Checkbox checked={selectedStudents.includes(s.id)} />
                                        <span>{s.name}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="groups">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4 mt-4">
                            {groups.map(g => (
                                <Card key={g.id} onClick={() => toggle(selectedGroups, g.id, setSelectedGroups)}>
                                    <CardContent className="flex gap-3 p-3 items-center">
                                        <Checkbox checked={selectedGroups.includes(g.id)} />
                                        <span>{g.name}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Assignment</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
