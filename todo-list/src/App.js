import React, { useState } from 'react';
import './App.css';

import Todo from './todo-page/Todo';
import Profile from './profile-page/Profile';
import Home from './home-page/Home';
import Signup from './auth-pages/Signup';
import Login from './auth-pages/Login';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// AUTH REQUIRED TO VIEW PAGE + add to export at the bottom
// import { withAuthenticator } from 'aws-amplify-react'

// VIEW PAGE WITHOUT AUTH (and check to see if user is authenticated)
import { Auth, Hub } from 'aws-amplify'


function App() {

  const [activeKey] = useState(window.location.pathname);
  const [userLoggedIn, setUserLoggedIn] = useState(0);

  Hub.listen('auth', (data) => {
    const { payload } = data;
    onAuthEvent(payload);
  })

  // uses auth listener to set auth state to true/false
  function onAuthEvent(payload) {
    if (payload.event === 'signIn' | payload.event === 'signUp') {
      setUserLoggedIn(true)
    }
    if (payload.event === 'signOut') {
      setUserLoggedIn(false)
    }
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
            <Button variant="light" onClick={() => Auth.signOut()}>Logout</Button> :
            <div>
              <Link to="/login"><Button variant="light">Login</Button></Link>
            </div>}
        </Navbar>
      </div>
      <Switch>
        <Route exact path="/" render={() => (<Home userLoggedIn={userLoggedIn} login={() => this.handleLogin.bind(this)} />)} />
        <Route exact path="/todos" render={() => (<Todo />)} />
        <Route exact path="/profile" render={() => (<Profile />)} />
        <Route exact path="/signup" render={() => (<Signup />)} />
        <Route exact path="/login" render={() => (<Login />)} />
      </Switch>
    </Router>
  )
}

export default App;
