import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form } from 'react-bootstrap';

export default class SignIn extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (e) => {
        let value = e.target.value
        let name = e.target.type
        this.setState({
            [name]: value
        })
    }

    getEmail = () => this.props.getUser(this.state.email)

    render() {
        return (
            <div>
                <header className="App-header">
                <Form style={{ backgroundColor: '#000000', opacity: '0.7', padding: '3%' }}>
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

                    <Button onClick={this.getEmail} variant="primary" type="submit">
                        <Link style={{ color: 'white' }} to='restaurants'>
                            Submit
                        </Link>
                    </Button>
                </Form>
                </header>
            </div>
        )
    }
}
