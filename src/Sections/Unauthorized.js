import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import Body from "../components/Panels/Body";

const Unauthorized = () => {
    return (
        <Body>
            <Container>
                <Row>
                    <Col className="text-center" md="12">
                        <h1 className="title text-danger">403</h1>
                        <p className="lead text-danger">Unauthorized</p>
                        <h4 className="description text-warning">
                            You don't have sufficient permissions to view this page.
                        </h4>
                        <p><Link to='/'>Back to Home</Link></p>
                    </Col>
                </Row>
            </Container>
        </Body>

    )
}

export default Unauthorized;