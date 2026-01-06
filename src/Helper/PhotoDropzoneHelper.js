import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { FaPlus, FaUser } from "react-icons/fa";

function PhotoDropzoneHelper({
    photo,
    onAdd,
    onRemove,
    accept,
    maxFileSize,
    maxFileCount,
    disabled
}) {
    const [error, setError] = useState(null);

    const onDrop = useCallback(
        (acceptedFiles) => {
            setError(null);

            if (!acceptedFiles || acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onerror = () => setError("Failed to read file.");
            reader.onabort = () => setError("File reading was aborted.");
            reader.onload = () => {
                onAdd(file, reader.result);
            };

            reader.readAsDataURL(file);
        },
        [onAdd]
    );

    const onDropRejected = useCallback((rejections) => {
        const rejection = rejections[0];
        if (!rejection) return;

        if (rejection.errors.some(e => e.code === "file-too-large")) {
            setError(`File size exceeds ${Math.round(maxFileSize / 1024)} KB.`);
        } else if (rejection.errors.some(e => e.code === "file-invalid-type")) {
            setError("Invalid file type.");
        } else {
            setError("File rejected.");
        }
    }, [maxFileSize]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept,
        maxSize: maxFileSize,
        maxFiles: maxFileCount,
        disabled
    });

    return (
        <Container className="w-100 h-100">
            <Row>
                <Col
                    {...getRootProps()}
                    className="d-flex justify-content-center align-items-center border rounded"
                    style={{
                        height: 150,
                        cursor: disabled ? "not-allowed" : "pointer",
                        backgroundColor: "#f8f9fa"
                    }}
                >
                    <input {...getInputProps()} />

                    {photo ? (
                        <img
                            src={`data:${photo.fileType};base64,${photo.fileContent}`}
                            alt={photo.fileName}
                            className="img-fluid h-100"
                        />
                    ) : (
                        <div className="text-center text-muted">
                            {isDragActive ? (
                                <>
                                    <FaPlus size={40} />
                                    <div className="mt-2">Drop image here</div>
                                </>
                            ) : (
                                <>
                                    <FaUser size={48} />
                                    <div className="mt-2">Click or drag to upload</div>
                                </>
                            )}
                        </div>
                    )}
                </Col>
            </Row>

            {error && (
                <Row className="mt-2">
                    <Col className="text-danger text-center">
                        <small>{error}</small>
                    </Col>
                </Row>
            )}

            {photo && !disabled && (
                <Row className="mt-2">
                    <Col className="text-center">
                        <Button size="sm" color="secondary" onClick={onRemove}>
                            Remove Photo
                        </Button>
                    </Col>
                </Row>
            )}

            <Row className="mt-2">
                <Col className="text-center text-muted">
                    <small>Max size: {Math.round(maxFileSize / 1024)} KB</small>
                </Col>
            </Row>
        </Container>
    );
}

PhotoDropzoneHelper.propTypes = {
    photo: PropTypes.shape({
        fileName: PropTypes.string.isRequired,
        fileType: PropTypes.string.isRequired,
        fileContent: PropTypes.string.isRequired
    }),
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    accept: PropTypes.object,
    maxFileSize: PropTypes.number.isRequired,
    maxFileCount: PropTypes.number,
    disabled: PropTypes.bool
};

PhotoDropzoneHelper.defaultProps = {
    accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"]
    },
    maxFileCount: 1,
    disabled: false
};

export default PhotoDropzoneHelper;
