import React, { useState } from 'react';

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
import { useHistory } from 'react-router-dom';

const signUpSchema = Yup.object({
    email: Yup.string().email('Username must be a valid email address.')
        .required('Please provide a username.'),
    password: Yup.string()
        .required('Please provide a password.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
})

const confirmationSchema = Yup.object({
    code: Yup.number()

})

function Signup() {

    const [signedUp, setSignedUp] = useState(false);
    const [email, setEmail] = useState('');
    const history = useHistory();

    async function handleSignUp(values) {
        Auth.signUp({
            username: values.email,
            password: values.password,
            attributes: {
                email: values.email,
            }
        })
            .then(data => console.log(data))
            .then(setSignedUp(true))
            .then(setEmail(values.email))
            .catch(err => console.log(err));
    }

    async function handleConfirmation(values) {
        console.log(email)
        console.log(values.code)
        Auth.confirmSignUp(email, String(values.code))
            .then(data => console.log(data))
            .then(history.push('/'))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Jumbotron fluid className="jumbo-image-todos d-flex align-items-center min-vh-100" style={{ color: "white" }}>
                <Container className="text-center">
                    <br />
                    {
                        signedUp ?
                            <div>
                                <h1 style={{ fontSize: "3em" }}>You should have been emailed a confirmation code.</h1>
                                <br />
                                <Formik
                                    validationSchema={confirmationSchema}
                                    onSubmit={(values) => handleConfirmation(values)}
                                    initialValues={{
                                        code: ""
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
                                                            <Form.Group controlId="formcode">
                                                                <Form.Label>Confirmation Code</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="code"
                                                                    value={values.code}
                                                                    onChange={handleChange}
                                                                >
                                                                </Form.Control>
                                                                <ErrorMessage name="code" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Button type="submit">Confirm Email</Button>
                                                </Form>
                                            )
                                    }
                                </Formik>
                            </div> :
                            <div>
                                <h1 style={{ fontSize: "3em" }}>Please enter an email and password to create your account.</h1>
                                <br />
                                <Formik
                                    validationSchema={signUpSchema}
                                    onSubmit={(values) => handleSignUp(values)}
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
                                                                    autoComplete="email"
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
                                                    <Button type="submit">Sign Up</Button>
                                                </Form>
                                            )
                                    }
                                </Formik>
                                
                            </div>
                    }
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Signup;