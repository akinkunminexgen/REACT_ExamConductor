import { useEffect, useState } from 'react';
import Auth from "../Services/Auth";
import Body from "../Components/Panels/Body";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Auth.login(email, password);
            //window.location.href = "/dashboard";
            <Navigate to="/dashboard" />
        } catch (err) {
            setError("Invalid email or password");
            setPassword("");
        }
    };

    return (
        <>
            <Body>
                <Container className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "80vh" }}>
                    <Row>
                        <Col md="12" className="mx-auto text-info" style={{ backgroundColor: "#2b2d2e", padding: "2rem", borderRadius: "8px" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="exampleInputEmail1">Identification No.</label>
                                    <input type="text" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} placeholder="Id. Number" required />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input className="form-control form-control-lg" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                                </div>


                                <div>
                                    <div className="text-left">
                                        {error && <p className="text-danger">{error}</p>}
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </div>
                                
                            </form>
                        </Col>
                        
                    </Row>
                </Container>
                
            </Body>
            
        </>
    );
}


