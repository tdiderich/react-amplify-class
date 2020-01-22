import React from 'react';
import Container from 'react-bootstrap/Container';
import todos from './todos';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// form stuff
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';

const schema = Yup.object({
    time: Yup.number()
})

class Todo extends React.Component {

    constructor() {
        super()
        this.state = {
            todos: todos,
            showAddTodo: false
        }
    }

    showAddTodo() {
        this.setState({ showAddTodo: true })
    }

    addTodo(values) {
        const uuidv1 = require('uuid/v1')
        this.state.todos.push({ uid: uuidv1(values.name), done: false, name: values.name, description: values.description })
        this.setState({
            todos: this.state.todos
        })
    }

    handleMarkComplete(uid) {
        const newTodos = this.state.todos.filter(a => a['uid'] !== uid)
        this.setState({
            todos: newTodos
        })
    }

    render() {
        return (
            <div>
                <Jumbotron fluid className="jumbo-image-todos d-flex align-items-center min-vh-100" style={{ color: "white" }}>
                    <Container className="text-center">
                        <h1 style={{ fontSize: "3em" }}>Todos</h1>
                        {
                            this.state.showAddTodo ?
                                <div>
                                    <Formik
                                        validationSchema={schema}
                                        onSubmit={this.addTodo.bind(this)}
                                        initialValues={{
                                            name: "Walk the pup.",
                                            description: "Don't forget the leash!"
                                        }}
                                    >
                                        {
                                            (
                                                {
                                                    handleSubmit,
                                                    handleChange,
                                                    values,
                                                }
                                            ) => (
                                                    <Form noValidate onSubmit={handleSubmit}>
                                                        <Row>
                                                            <Col md={{ offset: 4, span: 4 }} lg={{ offset: 4, span: 4 }} xl={{ offset: 4, span: 4 }}>
                                                                <Form.Group controlId="formName">
                                                                    <Form.Label>What do you need to do?</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="name"
                                                                        value={values.name}
                                                                        onChange={handleChange}>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                                <Form.Group controlId="formDescription">
                                                                    <Form.Label>Any more details?</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="description"
                                                                        value={values.description}
                                                                        onChange={handleChange}>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Button type="submit">Add Todo</Button>
                                                    </Form>
                                                )
                                        }
                                    </Formik>
                                </div> :
                                <Button onClick={this.showAddTodo.bind(this)}>Add Todo</Button>
                        }
                    </Container>
                </Jumbotron>
                <Container fluid>
                    {
                        this.state.todos.length > 0 ?
                            this.state.todos.map((items) => (
                                <Card key={items.uid}>
                                    <Card.Header>{items.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>Description: {items.description}</Card.Text>
                                        <Button onClick={this.handleMarkComplete.bind(this, items.uid)}>Mark Complete</Button>
                                    </Card.Body>
                                </Card>
                            )
                            ) :
                            <div>
                                <Container fluid style={{paddingBottom: "50px"}}>
                                    <h1 className="text-center">You have nothing to do!</h1>
                                </Container>
                            </div>
                    }
                </Container>
            </div>
        )
    }
}


export default Todo;