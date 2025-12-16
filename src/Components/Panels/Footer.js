import React from "react";

// reactstrap compnents
import { Button, Container, Row, Col } from "reactstrap";

// Core components

export default function FooterMain() {
    return (
        <>
            <footer className="footer footer-simple bg-gradient-default footer-height p-0 m-0">
                <Container className="w-100 h-100 p-0 m-0">
                    <Row className="w-100 h-100 p-0 m-0">
                        <Col md="12" className="m-0 p-0 h-100 w-100">
                            <div className="copyright m-0 p-0 h-100 w-100">
                                <a
                                    className="h-100 w-100"
                                    href="/"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {`© ACS ${new Date().getFullYear()}`}
                                </a>
                            </div>
                        </Col>
                       
                    </Row>
                </Container>
            </footer>
        </>
    );
}


