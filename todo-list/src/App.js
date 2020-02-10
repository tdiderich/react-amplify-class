import React, { useState } from 'react';
import './App.css';

import Todo from './todo-page/Todo';
import Profile from './profile-page/Profile';
import Home from './home-page/Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


function App() {

  const [activeKey] = useState(window.location.pathname);
  const [userLoggedIn, setUserLoggedIn] = useState(0);

  function login() {
    setUserLoggedIn(true)
  }

  function logout() {
    setUserLoggedIn(false)
  }

  return (
    <Router>
      <div >
        <Navbar className="navbar navbar-dark bg-dark" expand="lg">
          <Navbar.Brand as={Link} to="/" >Todojo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" activeKey={activeKey}>
              {userLoggedIn ? <Nav.Link as={Link} to="/todos" eventKey="/todo">Todos</Nav.Link> : null}
              {userLoggedIn ? <Nav.Link as={Link} to="/profile" eventKey="/profile">Profile</Nav.Link> : null}
            </Nav>
          </Navbar.Collapse>
          {userLoggedIn ?
            <Button variant="light" onClick={() => logout()}>Logout</Button> :
            <Button variant="light" onClick={() => login()}>Login</Button>}
        </Navbar>
      </div>
      <Switch>
        <Route exact path="/" render={() => (<Home userLoggedIn={userLoggedIn} login={() => login()} />)} />
        <Route exact path="/todos" render={() => (<Todo />)} />
        <Route exact path="/profile" render={() => (<Profile />)} />
      </Switch>
    </Router>
  )
}

export default App;
