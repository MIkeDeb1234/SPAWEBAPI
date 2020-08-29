import React, { Component, useState } from 'react';

import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Modal, Form, Button, FormControl, Dropdown } from 'react-bootstrap';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
import { UserService } from '../../_services/UserService';

export class Navigation extends Component {

    userService = new UserService();
    constructor(userService) {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }
    dropdownOpen = false;
    setOpen(tog) {
        this.dropdownOpen = tog;
        this.forceUpdate();
    }

    render() {
        var isLogin = this.userService.isLoggedIn();

        return (
            <div>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/home">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/panel">Panel</Nav.Link>
                           
                        </Nav>
                        {
                            !isLogin ?
                                <Form inline>
                                    <FormControl onChange={(event) => { this.setState({ username: event.target.value }) }} type="text" placeholder="Username" className="mr-sm-2" />
                                    <FormControl onChange={(event) => { this.setState({ password: event.target.value }) }} type="password" placeholder="Password" className="mr-sm-2" />
                                    <Button onClick={() => { this.login() }} variant="outline-success" className="mr-sm-2">Login</Button>
                                    <this.RegisterModal />
                                </Form>
                                :
                                <div>
                                    <Dropdown >
                                        <Dropdown.Toggle className="mr-sm-2" variant="success" id="dropdown-basic">
                                            Quick Use
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>{this.startClock()}} >Start Clock</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{this.stopClock()}} >Stop Clock</Dropdown.Item>
                                        </Dropdown.Menu>
                                        <Button onClick={() => { this.logout() }} variant="outline-success">Logout</Button>
                                    </Dropdown>
                                </div>

                        }

                    </Navbar.Collapse>

                </Navbar>

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
    async stopClock()
    {
        var res = await this.userService.stopClock();
        if (!res.err) {
            alert(res.res);
            window.location.reload(false)
        }
        else {
            alert("UnAuthorized!");

        }

    }
    
    async login() {
        await this.userService.login(this.state.username, this.state.password);
        window.location.reload(false)
        this.forceUpdate();

    }
    async logout() {
        await this.userService.logout();
        window.location.reload(false)
        this.forceUpdate();
    }

    RegisterModal() {
        const [show, setShow] = useState(false);
        const userService = new UserService();
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const register = async function () {
            var res = await userService.register(registerModel);
            alert(res.res);
            if (res.status)
                handleClose();
        }

        const registerModel = {
            username: "",
            password: ""
        }
        return (
            <>
                <Button variant="outline-danger" onClick={handleShow}>
                    Register
            </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form inline>
                            <FormControl onChange={(event) => { registerModel.username = event.target.value }} type="text" placeholder="Username" className="mr-sm-2" />
                            <FormControl onChange={(event) => { registerModel.password = event.target.value }} type="password" placeholder="Password" className="mr-sm-2" />
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                </Button>
                        <Button variant="primary" onClick={register}>
                            Register
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}