import { Spinner } from "reactstrap";

export default function GlobalLoader() {
    return (
        <div style={overlayStyle}>
            <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
};
