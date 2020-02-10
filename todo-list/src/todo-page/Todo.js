import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import todos from './todos';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// form stuff
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';

const schema = Yup.object({
    name: Yup.string().required('Please add a task name.'),
    description: Yup.string().required('Please add a description.')
})

function Todo() {

    const [todoList, updateTodos] = useState(todos)
    const [showAddTodo, updateShowAddTodo] = useState(0)

    function flipShowTodo() {
        updateShowAddTodo(true)
    }

    function addTodo(values) {
        const uuidv1 = require('uuid/v1')
        todoList.push({ uid: uuidv1(values.name), done: false, name: values.name, description: values.description })
        updateTodos([...todoList])
    }

    function handleMarkComplete(uid) {
        const newTodos = todoList.filter(a => a['uid'] !== uid)
        updateTodos([...newTodos])
    }

    return (
        <div>
            <Jumbotron fluid className="jumbo-image-todos d-flex align-items-center min-vh-100" style={{ color: "white" }}>
                <Container className="text-center">
                    <h1 style={{ fontSize: "3em" }}>Todos</h1>
                    {
                        showAddTodo ?
                            <div>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={(values) => addTodo(values)}
                                    initialValues={{
                                        name: "",
                                        description: ""
                                    }}
                                >
                                    {
                                        (
                                            {
                                                handleSubmit,
                                                handleChange,
                                                values,
                                                errors,
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
                                                                    onChange={handleChange}
                                                                    >
                                                                </Form.Control>
                                                                <ErrorMessage name="name" />
                                                            </Form.Group>
                                                            <Form.Group controlId="formDescription">
                                                                <Form.Label>Any more details?</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="description"
                                                                    value={values.description}
                                                                    onChange={handleChange}
                                                                    >
                                                                </Form.Control>
                                                                <ErrorMessage name="description" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Button type="submit">Add Todo</Button>
                                                </Form>
                                            )
                                    }
                                </Formik>
                            </div> :
                            <Button onClick={() => flipShowTodo()}>Add Todo</Button>
                    }
                </Container>
            </Jumbotron>
            <Container fluid style={{marginBottom: "2em"}}>
                {
                    todoList.length > 0 ?
                        todoList.map((items) => (
                            <Card key={items.uid}>
                                <Card.Header>{items.name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>Description: {items.description}</Card.Text>
                                    <Button onClick={() => handleMarkComplete(items.uid)}>Mark Complete</Button>
                                </Card.Body>
                            </Card> )) :
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


export default Todo;