import React, { Component } from 'react';
import { UserService } from '../../_services/UserService';
import { Container, FormControl, InputGroup, Row, Button, Card, Col } from 'react-bootstrap';


export class UserProfile extends Component {
    userService = new UserService();
    constructor(userService) {
        super();
        this.state = {
            currentPassword:null,
            newPassword: null
        }
    }
    render() {
        return (
            <div className="mt-5 d-flex justify-content-left">
                {
                    !this.userService.isLoggedIn() ?
                        <div>
                            Please login before you want to edit your profile!
                        </div>
                        :
                        <div>
                            <Container>
                                <Row>
                                    <Col sm="12" md={{ size: 24, offset: 0 }}>
                                        <Card>
                                            <Card.Header as="h5">Change Password</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Here You can change you'r password</Card.Title>
                                                <FormControl className="mb-3" onChange={(event) => { this.setState({ currentPassword: event.target.value }) }}
                                                    type="password" placeholder="Current Password" />
                                                <FormControl className="mb-3" onChange={(event) => { this.setState({ newPassword: event.target.value }) }}
                                                    type="password" placeholder="New Password" />
                                                <Button onClick={() => { this.changePassword() }} variant="primary">Change Password</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                }
            </div>
        )
    }
    async changePassword()
    {
       var res = await this.userService.changePassword(this.state.newPassword,this.state.currentPassword);
       alert(res.res);
       if(res.status)
       {
           window.location.href = "/home"
       }
    }
}