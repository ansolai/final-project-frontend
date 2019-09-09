import React from "react";
import NavStyle from './NavStyle.css';
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import {
  Home,
  Person,
  Map,
  Assignment,
  Info,
  AccountBox,
  Settings,
    About,
    ExitToApp,
    SettingsCell,
} from "@material-ui/icons";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
// https://material-ui.com/components/material-icons icon search from here
import LoginModal from "../login/LoginModal";
import { Consumer } from "../context/Authcontext";
import Avatar from '@material-ui/core/Avatar'

export const NavBar = () => (
    <Consumer>
        {({ logOut, username }) => (
            <Navbar bg="light" expand="lg">
                <Link to="/"><Navbar.Brand><Home />SKP</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to="/plan" ><Assignment color="inherit" />Plan</Link></Nav.Link>
                        <Nav.Link>
                            <Link to="/map"><Map />Map</Link></Nav.Link>
                        <Nav.Link>
                            <Link to="/feed"><PhotoLibraryIcon />Feed</Link></Nav.Link>
                        <Nav.Link>
                            <Link to="/calculators"><SettingsCell />Calculators</Link></Nav.Link>
                      <Nav.Link>
                            <Link to="/about"><Info />About</Link></Nav.Link>



                    </Nav>
                    {/* <Avatar aria-label="recipe" style={avatarStyle}>
                        {username.substring(0, 1).toUpperCase()}
                    </Avatar> */}
                        <span className="link-unstyled">{username}</span>
                    
                    &nbsp;
                    <Nav>
                        <Nav.Link className="justify-content-end"><span onClick={logOut}><ExitToApp  /> Log out</span></Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>)}
    </Consumer>
)

const avatarStyle = {
    backgroundColor: 'red[500]'
}


/*
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Home, Map, Assignment, Info, AccountBox, Settings, ExitToApp } from '@material-ui/icons'

function NavBar(props) {

    return (
        <List component="nav">
            <ListItem component="div" >

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Home  <Home />
                    </TypoGraphy>
                </ListItemText>


                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Plans <Assignment />
                    </TypoGraphy>
                </ListItemText>



                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Map <Map />
                    </TypoGraphy>
                </ListItemText>
                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Settings <Settings />
                    </TypoGraphy>
                </ListItemText>
                <ListItemText inset>
                <TypoGraphy color="inherit" variant="title">
                    About <Info />
                </TypoGraphy>
                </ListItemText>
                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        Log out <ExitToApp />
                    </TypoGraphy>
                </ListItemText>
            </ListItem >

        </List>
    )
}


export default NavBar;*/
