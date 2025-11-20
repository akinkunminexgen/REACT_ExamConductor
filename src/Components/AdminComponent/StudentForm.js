import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

export default function StudentForm({ setModalOpen, toEdit = {} }) {
    const [form, setForm] = useState({});
    const [readOnlyTag, setReadOnlyTag] = useState(false);
    const [errors, setErrors] = useState({});

    //function to know if question is being editted
    const enableEdit = () => {
        setReadOnlyTag(true);
        setForm({
            ...toEdit,
            DateOfBirth: toEdit.DateOfBirth?.split("T")[0] || ""
        })
    }

    useEffect(() => {
        if (toEdit && Object.keys(toEdit).length > 0) {
            enableEdit();
        }
    }, []);

    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let err = {};
        if (!form.StudentNumber) err.StudentNumber = "Required";
        if (!form.FullName) err.FullName = "Required";
        if (!form.Email) err.Email = "Email required";
        if (!form.Gender) err.Gender = "Required";
        if (!form.DateOfBirth) err.dob = "DoB required";
        if (!form.Grade) err.Grade = "Grade required";
        if (!form.ParentName) err.ParentName = "Parent name required";
        if (!form.EmergencyPhone) err.EmergencyPhone = "Emergency phone required";
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = validate();
        setErrors(err);
        
        if (Object.keys(err).length === 0) {
            console.log("SUBMITTED DATA:", form);
            alert("Student Record Saved Successfully!");
            setModalOpen(false);
        }
    };

    return (
        <form className="p-6 space-y-6 general-small-font" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <h5 className="text-xl font-semibold mb-2">Basic Information</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Student No.</Label></div>
                    <div className="col-4">
                        <Input name="studentNumber" type="text" value={form.StudentNumber || ""} onChange={handleChange} placeholder="Enter student number" disabled={readOnlyTag} />
                        {errors.StudentNumber && <small className="text-danger">{errors.StudentNumber}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Full Name</Label></div>
                    <div className="col-4">
                        <Input name="fullName" type="text" value={form.FullName || ""} onChange={handleChange} placeholder="Enter firstname and surname" />
                        {errors.FullName && <small className="text-danger">{errors.FullName}</small>}
                    </div>
                </div>
            </FormGroup>

            {/* Gender + DOB */}
            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Gender</Label></div>
                    <div className="col-4">
                        <Input name="gender" type="select" value={form.Gender ||""} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Male"> Male</option>
                            <option value="Female">Female</option>
                        </Input>
                        {errors.Gender && <small className="text-danger">{errors.Gender}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Date of Birth</Label></div>
                    <div className="col-4">
                        <Input name="dob" type="date" value={form.DateOfBirth || ""} onChange={handleChange} />
                        {errors.dob && <small className="text-danger">{errors.dob}</small>}
                    </div>
                </div>
            </FormGroup>

            {/* Contact Information */}
            <h5 className="text-xl font-semibold mt-4">Contact Information</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Email</Label></div>
                    <div className="col-4">
                        <Input name="email" type="email" value={form.Email || ""} onChange={handleChange} placeholder="Enter email" />
                        {errors.Email && <small className="text-danger">{errors.Email}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Phone</Label></div>
                    <div className="col-4">
                        <Input name="phone" type="text" value={form.Phone || ""} onChange={handleChange} placeholder="Enter phone" />
                    </div>
                </div>
            </FormGroup>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Address</Label></div>
                    <div className="col-4">
                        <Input name="address" type="text" value={form.address} onChange={handleChange} placeholder="Enter address" />
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">City</Label></div>
                    <div className="col-4">
                        <Input name="city" type="text" value={form.city} onChange={handleChange} placeholder="Enter city" />
                    </div>
                </div>
            </FormGroup>

            {/* Academic Info */}
            <h5 className="text-xl font-semibold mt-4">Academic Information</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Grade</Label></div>
                    <div className="col-4">
                        <Input name="grade" type="text" value={form.Grade || ""} onChange={handleChange} placeholder="Enter grade" />
                        {errors.Grade && <small className="text-danger">{errors.Grade}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Section</Label></div>
                    <div className="col-4">
                        <Input name="section" type="text" value={form.Section || ""} onChange={handleChange} placeholder="Enter section" />
                    </div>
                </div>
            </FormGroup>

            {/* Parent Information */}
            <h5 className="text-xl font-semibold mt-4">Parent / Guardian</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Name</Label></div>
                    <div className="col-4">
                        <Input name="parentName" type="text" value={form.ParentName || ""} onChange={handleChange} placeholder="Enter parent's name" />
                        {errors.ParentName && <small className="text-danger">{errors.ParentName}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Relationship</Label></div>
                    <div className="col-4">
                        <Input name="relationship" type="text" value={form.RelationShip || ""} onChange={handleChange} placeholder="Father / Mother / Guardian" />
                    </div>
                </div>
            </FormGroup>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Phone</Label></div>
                    <div className="col-4">
                        <Input name="parentPhone" type="text" value={form.ParentPhone || ""} onChange={handleChange} placeholder="Enter parent phone" />
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Email</Label></div>
                    <div className="col-4">
                        <Input name="parentEmail" type="email" value={form.ParentEmail || ""} onChange={handleChange} placeholder="Enter parent email" />
                    </div>
                </div>
            </FormGroup>

            {/* Emergency Contact */}
            <h5 className="text-xl font-semibold mt-4">Emergency Contact</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Phone</Label></div>
                    <div className="col-4">
                        <Input name="emergencyName" type="text" value={form.EmergencyName || ""} onChange={handleChange} placeholder="Enter Emergency Name" />
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Email</Label></div>
                    <div className="col-4">
                        <Input name="emergencyPhone" type="Phone" value={form.EmergencyPhone || ""} onChange={handleChange} placeholder="Enter Emergency Phone" />
                    </div>
                </div>
            </FormGroup>


            {/* Button Row */}
            <FormGroup>
                <div className="row mt-3">
                    <div className="col-6">
                        <Button color="danger" onClick={handleSubmit} className="w-100">
                            Save
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button color="secondary" onClick={() => setModalOpen(false)} className="w-100">
                            Cancel
                        </Button>
                    </div>
                </div>
            </FormGroup>

        </form>
    );

}
