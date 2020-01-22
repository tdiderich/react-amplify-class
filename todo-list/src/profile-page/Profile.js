import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import user from './user';

class Profile extends React.Component {

    constructor() {
        super()
        this.state = {
            user: user
        }
    }
    
    render() {
        return (
            <div>
                <Jumbotron fluid className="jumbo-image-profile d-flex align-items-center min-vh-100" style={{ color: "white" }}>
                    <Container className="text-center">
                        {
                            this.state.user.map((user) => (
                                <div key={user.first}>
                                    <h1 style={{ fontSize: "3em" }}>{user.first} {user.last}</h1>
                                    <br/>
                                    <Link to="/todos"><Button variant="light">View Todo List</Button></Link>
                                </div>
                            ))
                        }
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}


export default Profile;