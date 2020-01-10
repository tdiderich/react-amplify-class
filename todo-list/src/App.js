import React from 'react';
import './App.css';

import Todo from './todo-page/Todo';
import Profile from './profile-page/Profile';
import Home from './home-page/Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeKey: window.location.pathname,
      userLoggedIn: false
    }
  }

  handleLogin() {
    this.setState({
      userLoggedIn: true
    })
    console.log(this.state)
  }

  handleLogout() {
    this.setState({
      userLoggedIn: false
    })
    console.log(this.state)
  }

  render() {
    return (
      <Router>
        <div >
          <Navbar className="navbar navbar-dark bg-dark" expand="lg">
            <Navbar.Brand as={Link} to="/" >Todo List App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto" activeKey={this.state.activeKey}>
                {this.state.userLoggedIn ? <Nav.Link as={Link} to="/todos" eventKey="/todo">Todos</Nav.Link> : null}
                {this.state.userLoggedIn ? <Nav.Link as={Link} to="/profile" eventKey="/profile">Profile</Nav.Link> : null}
              </Nav>
            </Navbar.Collapse>
            {this.state.userLoggedIn ?
              <Button variant="danger" onClick={this.handleLogout.bind(this)}>Logout</Button> :
              <Button onClick={this.handleLogin.bind(this)}>Login</Button>}
          </Navbar>
        </div>
        <Switch>
          <Route exact path="/" render={() => (<Home userLoggedIn={this.state.userLoggedIn} login={this.handleLogin.bind(this)} />)} />
          <Route exact path="/todos" render={() => (<Todo />)} />
          <Route exact path="/profile" render={() => (<Profile />)} />
        </Switch>
      </Router>
    )
  }
}

export default App;
