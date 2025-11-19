import { useState, useEffect } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

export default function Error({ errorMessage, duration = 5000 }) {
    const [visible, setVisible] = useState(!!errorMessage);

    useEffect(() => {
        setVisible(!!errorMessage);

        if (errorMessage) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, duration]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "1rem",
                right: "1rem",
                zIndex: 1050,
                minWidth: "250px",
            }}
        >
            <Toast>
                <ToastHeader icon="danger">Error</ToastHeader>
                <ToastBody>{errorMessage.split(" : ")[0]}</ToastBody>
            </Toast>
        </div>
    );
}
