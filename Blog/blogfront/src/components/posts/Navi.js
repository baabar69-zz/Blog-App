import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
export default class Navi extends Component {
  render() {
    const token = JSON.parse(localStorage.getItem("token"));
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">BlogApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mar">
          <Nav className="mr-auto">
            <Nav href="#home">
              <Link to="/">Home</Link>
            </Nav>
            <Nav href="#home">
              <Link to="/create">Create Post</Link>
            </Nav>
            <Nav href="#home">
              <Link to="/blogs">Blogs</Link>
            </Nav>
            {!token? <Nav href="#home">
              <Link to="/login">LogIn</Link>
            </Nav> : <Nav href="#home">
              <Link to="/logout">logout</Link>
            </Nav>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
