import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import {
    Home,
    Info,
    SettingsCell
} from "@material-ui/icons";
import LoginModal from "../login/LoginModal";
import { Consumer } from "../context/Authcontext";
import Signup from "../signup/Signup";

export const NotLoggedNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Link to="/"><Navbar.Brand><Home />SKP</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                
                <Nav.Link>
                    <Link to="/about"><Info />About</Link></Nav.Link>
                    <Nav.Link>
                    <Link to="/calculators"><SettingsCell />Calculators</Link></Nav.Link>
                
            </Nav>
            <Nav>
                <Nav.Link className="justify-content-end"><LoginModal/><Signup/></Nav.Link>

            </Nav>
        </Navbar.Collapse>
    </Navbar>
)