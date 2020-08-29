import React, { Component } from 'react';
import { UserService } from '../../_services/UserService';
import { Button, Card } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';

export class Panel extends Component {
    userService = new UserService();
    render() {
        return (
            <div className="mt-5 d-flex justify-content-left">
                {
                    this.userService.isLoggedIn() ?
                        <div>

                            <Container>
                                <Row>
                                    <Col sm="12" md={{ size: 12, offset: 3 }}><h2>Welcome to your employee panel!</h2></Col>
                                </Row>
                                <Row>
                                    {/* StartClock Card */}
                                    <Col xs="4">
                                        <Card >
                                            <Card.Header as="h5">Start Clock</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Here You can click to start a clock</Card.Title>

                                                <Button onClick={() => { this.startClock(); }} variant="primary">Start Clock</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col xs="4">
                                        {/* StopClock Card */}
                                        <Card>
                                            <Card.Header as="h5">Stop Clock</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Here You can click to stop the clock</Card.Title>
                                                <Card.Text>
                                                    You'r last on going clock started at:
                                                </Card.Text>
                                                <Card.Text>
                                                    <b> {
                                                        localStorage.getItem("clock")
                                                    }</b>
                                                </Card.Text>
                                                <Button onClick={() => { this.stopClock() }} variant="primary">Stop Clock</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs="4">
                                        {/* Edit profile Card */}
                                        <Card>
                                            <Card.Header as="h5">Edit Profile</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Here You can click to edit you'r profile</Card.Title>
                                                <Button onClick={() => { window.location.href = "/user/userprofile" }} variant="primary">Edit Profile</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col style={{ marginTop: "10px" }} sm="12" md={{ size: 4, offset: 4 }}>
                                        {/* Time Sheet Card */}
                                        <Card>
                                            <Card.Header as="h5">Time Sheet</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Here You can click to view you'r clocks</Card.Title>
                                                <Button onClick={() => { window.location.href = "/user/viewclock" }} variant="primary">View Clocks</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                            <div>



                                <br></br>

                            </div>
                        </div>
                        :
                        <div className="container" >
                            <h3>You must login before you can use your panel!</h3>
                        </div>
                }
            </div>

        )
    }
    async startClock() {
        var res = await this.userService.startClock();
        if (!res.err) {
            alert(res.res)
        }
        else {
            alert("UnAuthorized!");

        }
    }
    async stopClock() {
        var res = await this.userService.stopClock();
        if (!res.err) {
            alert(res.res);
            window.location.reload(false)
        }
        else {
            alert("UnAuthorized!");

        }

    }
}