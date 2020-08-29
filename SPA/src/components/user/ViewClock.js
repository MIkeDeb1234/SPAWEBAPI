import React, { Component, useState } from 'react';
import { UserService } from '../../_services/UserService';
import { Container, FormControl, InputGroup, Row, Button, Card, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ClockService } from '../../_services/ClockService'

export class ViewClock extends Component {
    userService = new UserService();
    clockService = new ClockService();
    startTime = new Date();
    endTime = new Date();

    changeStartDate(date) {
        this.startTime = date;
        this.forceUpdate();
    }
    changeEndDate(date) {
        this.endTime = date;
        this.forceUpdate();
    }
    render() {

        return (
            <div className="mt-5 d-flex justify-content-left">
                {
                    !this.userService.isLoggedIn() ?
                        <div>
                            Please login in order to view your clock sheet!
                        </div>
                        :
                        <div>
                            <Container>
                                <Row>
                                    <Col xs="5">
                                        <Card >
                                            <Card.Header as="h5">From</Card.Header>
                                            <Card.Body>
                                                <DatePicker selected={this.startTime} value={this.startTime} onChange={(date) => this.changeStartDate(date)} />
                                                {/* onChange={date => setStartDate(date)} */}
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                    <Col xs="5">
                                        <Card >
                                            <Card.Header as="h5">Till</Card.Header>
                                            <Card.Body>
                                                <DatePicker selected={this.endTime} onChange={(date) => this.changeEndDate(date)} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col style={{ marginTop: "10px" }} xs="4">

                                        <Button onClick={() => { this.showResults() }} variant="outline-success" className="mr-sm-2">Show Results</Button>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col >
                                        {
                                          
                                            this.clockService.getData1().map((item) =>
                                                <Card style={{ marginTop: "10px" }}>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            Started : {item.started}
                                                         </Card.Text>
                                                         <Card.Text>
                                                            Ended : {item.ended}
                                                         </Card.Text>
                                                         <Card.Text>
                                                            Done : {item.done?"True":"False"}
                                                         </Card.Text>

                                                    </Card.Body>
                                                </Card>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                }
            </div>

        )
    }
    getItem(item) {

        return "Started :" + item.started + " / Ended : " + item.ended + " / Done? : " + item.done;
    }
    async showResults() {
        var res = await this.clockService.getData(this.startTime, this.endTime);
        this.forceUpdate();
    }


}