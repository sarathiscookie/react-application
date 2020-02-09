import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

export default class Auth extends Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            login: false,
            store: null
        }
    }

    // After login hold the login page till token expire.
    componentDidMount() {
        this.storeCollector()
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'));

        if (store && store.login) {
            this.setState({ login: true, store: store })
        }
    }

    // Login and storing token in local storage till token expire.
    login() {
        fetch('http://restapiproject.test/api/login_check', {
            method: "POST",
            body: JSON.stringify(this.state)
        }).then((response) => {
            response.json().then((result) => {
                //console.warn("result", result);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    store: result.token
                }));
                this.storeCollector();
            });
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>Sign In to API</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" onChange={(event) => { this.setState({ username: event.target.value }) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => { this.setState({ password: event.target.value }) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>

                            <Button variant="primary" onClick={() => { this.login() }}> Login </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
