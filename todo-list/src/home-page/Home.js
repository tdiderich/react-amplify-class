import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Container className="text-center" fluid>
                    <h1>Todo List App</h1>
                    <h3>Where toDOs become toDONEs.</h3>
                    {this.props.userLoggedIn ?
                        <div>
                            <Button variant="success" href="/todo">View Todo List</Button>
                            <br />
                            <br />
                            <Button variant="info" href="/profile">View Profile</Button>
                        </div> :
                        <Button onClick={this.props.login}>Login</Button>}
                </Container>
            </div>
        )
    }
}

export default Home;