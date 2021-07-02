import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import '../styles/signIn.css'

export default class SignIn extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (e) => {
        let value = e.target.value;
        let name = e.target.type;
        this.setState({ [name]: value });
    }

    getEmail = () => {
        this.props.getUser(this.state.email);
        localStorage.email = this.state.email;
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <Form className="signInForm">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={this.handleInput} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.handleInput} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button onClick={this.getEmail} style={{ backgroundColor: 'rgb(234,237,192)' }} variant="primary" type="submit">
                            <Link id="link" to='restaurants/0'>
                                Sign in
                            </Link>
                        </Button>
                    </Form>
                </header>
            </div>
        )
    }
}
