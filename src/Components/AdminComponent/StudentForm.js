import React, { useState, useEffect, useCallback } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import PhotoDropzoneHelper from "../../helper/PhotoDropzoneHelper";

export default function StudentForm({ setModalOpen, toEdit = {} }) {
    const [form, setForm] = useState({});
    const [readOnlyTag, setReadOnlyTag] = useState(false);
    const [errors, setErrors] = useState({});

    const [photo, setPhoto] = useState(null);

    const handleAddPhoto = useCallback((file, base64) => {
        const [meta, content] = base64.split(",");
        const fileType = meta.match(/data:(.*);base64/)[1];

        setPhoto({
            fileName: file.name,
            fileType,
            fileContent: content
        });
    }, []);

    const handleRemovePhoto = useCallback(() => {
        setPhoto(null);
    }, []);


    //function to know if question is being editted
    const enableEdit = () => {
        setReadOnlyTag(true);
        setForm({
            ...toEdit,
            DateOfBirth: toEdit.DateOfBirth?.split("T")[0] || ""
        });
        if (toEdit.photo) {
            setPhoto({
                fileName: toEdit.photo.fileName,
                fileType: toEdit.photo.fileType,
                fileContent: toEdit.photo.fileContent
            });
        }
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
        if (!form.studentNumber) err.StudentNumber = "Required";
        if (!form.fullName) err.FullName = "Required";
        if (!form.email) err.Email = "Email required";
        if (!form.gender) err.Gender = "Required";
        if (!form.dob) err.dob = "DoB required";
        if (!form.grade) err.Grade = "Grade required";
        if (!form.parentName) err.ParentName = "Parent name required";
        if (!form.emergencyPhone) err.EmergencyPhone = "Emergency phone required";
        if (!photo) err.photo = "Student photo is required";
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = validate();
        setErrors(err);
        
        if (Object.keys(err).length === 0) {

            const payload = {
                ...form,
                photo: photo
                    ? {
                        fileName: photo.fileName,
                        fileType: photo.fileType,
                        fileContent: photo.fileContent
                    }
                    : null
            };

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
                <div className="row align-items-start">
                    <div className="col-6 p-3">

                        <PhotoDropzoneHelper
                            photo={photo}
                            onAdd={handleAddPhoto}
                            onRemove={handleRemovePhoto}
                            maxFileSize={200 * 1024}
                        />

                        {errors.photo && (
                            <small className="text-danger">{errors.photo}</small>
                        )}
                    </div>

                    <div className="col-6">
                        {/* Student Number */}
                        <div className="row mb-2">
                            <div className="col-4">
                                <Label className="fw-semibold text-secondary mb-0">
                                    Student No.
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    name="studentNumber"
                                    type="text"
                                    value={form.studentNumber || ""}
                                    onChange={handleChange}
                                    placeholder="Enter student number"
                                    disabled={readOnlyTag}
                                />
                                {errors.StudentNumber && (
                                    <small className="text-danger">
                                        {errors.StudentNumber}
                                    </small>
                                )}
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="row mb-2">
                            <div className="col-4">
                                <Label className="fw-semibold text-secondary mb-0">
                                    First Name
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    name="firstName"
                                    type="text"
                                    value={form.firstName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter firstname"
                                />
                                {errors.FullName && (
                                    <small className="text-danger">
                                        {errors.FullName}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <Label className="fw-semibold text-secondary mb-0">
                                    Middle Name
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    name="middleName"
                                    type="text"
                                    value={form.middleName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter middlename "
                                />
                                {errors.FullName && (
                                    <small className="text-danger">
                                        {errors.FullName}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-4">
                                <Label className="fw-semibold text-secondary mb-0">
                                    Surname
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    name="surname"
                                    type="text"
                                    value={form.surname || ""}
                                    onChange={handleChange}
                                    placeholder="Enter lastname"
                                />
                                {errors.FullName && (
                                    <small className="text-danger">
                                        {errors.FullName}
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-4">
                                <Label className="fw-semibold text-secondary mb-0">Gender</Label>
                            </div>
                            <div className="col-8">
                                <Input className="form-select w-100" name="gender" type="select" value={form.gender || ""} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Male"> Male</option>
                                    <option value="Female">Female</option>
                                </Input>
                                {errors.Gender && <small className="text-danger">{errors.Gender}</small>}
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-4">
                                <Label className="fw-semibold text-secondary mb-0">Date of Birth</Label>
                            </div>
                            <div className="col-8">
                                <Input name="dob" type="date" value={form.dob || ""} onChange={handleChange} />
                                {errors.dob && <small className="text-danger">{errors.dob}</small>}
                            </div>
                        </div>
                    </div>
                </div>
            </FormGroup>


            {/* Contact Information */}
            <h5 className="text-xl font-semibold mt-4">Contact Information</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Email</Label></div>
                    <div className="col-4">
                        <Input name="email" type="email" value={form.email || ""} onChange={handleChange} placeholder="Enter email" />
                        {errors.Email && <small className="text-danger">{errors.Email}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Phone</Label></div>
                    <div className="col-4">
                        <Input name="phone" type="text" value={form.phone || ""} onChange={handleChange} placeholder="Enter phone" />
                    </div>
                </div>
            </FormGroup>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Address</Label></div>
                    <div className="col-4">
                        <Input name="address" type="text" value={form.address || ""} onChange={handleChange} placeholder="Enter address" />
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
                        <Input name="grade" type="text" value={form.grade || ""} onChange={handleChange} placeholder="Enter grade" />
                        {errors.Grade && <small className="text-danger">{errors.Grade}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Section</Label></div>
                    <div className="col-4">
                        <Input name="section" type="text" value={form.section || ""} onChange={handleChange} placeholder="Enter section" />
                    </div>
                </div>
            </FormGroup>

            {/* Parent Information */}
            <h5 className="text-xl font-semibold mt-4">Parent / Guardian</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Name</Label></div>
                    <div className="col-4">
                        <Input name="parentName" type="text" value={form.parentName || ""} onChange={handleChange} placeholder="Enter parent's name" />
                        {errors.ParentName && <small className="text-danger">{errors.ParentName}</small>}
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Relationship</Label></div>
                    <div className="col-4">
                        <Input name="relationship" type="text" value={form.relationship || ""} onChange={handleChange} placeholder="Father / Mother / Guardian" />
                    </div>
                </div>
            </FormGroup>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Phone</Label></div>
                    <div className="col-4">
                        <Input name="parentPhone" type="text" value={form.parentPhone || ""} onChange={handleChange} placeholder="Enter parent phone" />
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Parent Email</Label></div>
                    <div className="col-4">
                        <Input name="parentEmail" type="email" value={form.parentEmail || ""} onChange={handleChange} placeholder="Enter parent email" />
                    </div>
                </div>
            </FormGroup>

            {/* Emergency Contact */}
            <h5 className="text-xl font-semibold mt-4">Emergency Contact</h5>

            <FormGroup>
                <div className="row">
                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Emergency Phone</Label></div>
                    <div className="col-4">
                        <Input name="emergencyPhone" type="Phone" value={form.emergencyPhone || ""} onChange={handleChange} placeholder="Enter Emergency Phone" />
                    </div>

                    <div className="col-2"><Label className="fw-semibold text-secondary mb-0">Emergency Email</Label></div>
                    <div className="col-4">
                        <Input name="emergencyEmail" type="text" value={form.emergencyEmail || ""} onChange={handleChange} placeholder="Enter Emergency Name" />
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
