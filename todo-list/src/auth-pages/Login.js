import React from 'react';

// bootstrap stuff
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// auth stuff
import Auth from "@aws-amplify/auth"

// form stuff
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';

// routing 
import { useHistory, Link } from "react-router-dom";

const schema = Yup.object({
    email: Yup.string().email('Username must be a valid email address.')
        .required('Please provide a username.'),
    password: Yup.string()
        .required('Please provide a password.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
})



function Login() {
    
    const history = useHistory();

    async function handleSignIn(values) {
        Auth.signIn({
            username: values.email,
            password: values.password,
        }).then(user => console.log(user))
            .then(history.push("/todos"))
            .catch(err => console.log(err)); 
    }

    return (
        <div>
            <Jumbotron fluid className="jumbo-image-todos d-flex align-items-center min-vh-100" style={{ color: "white" }}>
                <Container className="text-center">
                    <h1 style={{ fontSize: "3em" }}>Please enter your email and password.</h1>
                    <br />
                    {
                        <div>
                            <Formik
                                validationSchema={schema}
                                onSubmit={(values) => handleSignIn(values)}
                                initialValues={{
                                    email: "",
                                    password: ""
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
                                                        <Form.Group controlId="formEmail">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                autoComplete="username"
                                                            >
                                                            </Form.Control>
                                                            <ErrorMessage name="email" />
                                                        </Form.Group>
                                                        <Form.Group controlId="formPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="password"
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                autoComplete="current-password"
                                                            >
                                                            </Form.Control>
                                                            <ErrorMessage name="password" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button variant="light" type="submit">Login</Button>
                                            </Form>
                                        )
                                }
                            </Formik>
                            <br />
                            <Link to="/signup">Don't have an account? Click here to sign up.</Link>
                        </div>
                    }
                </Container>
            </Jumbotron>
        </div>
    )


}

export default Login;