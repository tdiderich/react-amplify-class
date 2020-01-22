import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Jumbotron fluid className="jumbo-image-home d-flex align-items-center min-vh-100" style={{color: "white"}}>
                    <Container className="text-center">
                        <h1 style={{ fontSize: "3em"}}>Todojo</h1>
                        <br />
                        <h3>Where todos become todone.</h3>
                        <br/>
                        {this.props.userLoggedIn ?
                        <div>
                            <Link to="/todos"><Button variant="dark">View Todo List</Button></Link>
                            <br />
                            <br />
                            <Link to="/profile"><Button variant="dark">View Profile</Button></Link>
                        </div> :
                        <Button variant="light" onClick={this.props.login}>Login</Button>}
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}


export default Home;