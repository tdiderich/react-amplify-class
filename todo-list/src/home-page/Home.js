import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useHistory } from 'react-router-dom';

function Home(props) {

    const history = useHistory();

    function clickLogin() {
        history.push('/login')
    }

    function clickTodos() {
        history.push('/todos')
    }

    function clickProfile() {
        history.push('/profile')
    }

    return (
        <div>
            <Jumbotron fluid className="jumbo-image-home d-flex align-items-center min-vh-100" style={{color: "white"}}>
                <Container className="text-center">
                    <h1 style={{ fontSize: "3em"}}>Todojo</h1>
                    <br />
                    <h3>Where todos become todone.</h3>
                    <br/>
                    {props.userLoggedIn ?
                    <div>
                        <Button variant="dark" onClick={() => clickTodos()}>View Todo List</Button>
                        <br />
                        <br />
                        <Button variant="dark" onClick={() => clickProfile()}>View Profile</Button>
                    </div> :
                    <Button variant="light" onClick={() => clickLogin()}>Login</Button>}
                </Container>
            </Jumbotron>
        </div>
    )
}


export default Home;