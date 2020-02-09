import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import Auth from "./Auth";

const auth = new Auth();

export default class TreeStore extends Component {

    // Storing title
    post() {
        let token = `Bearer ${auth.state.store.store}`;

        fetch('http://restapiproject.test/api/lists', {
            method: "POST",
            headers: {
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        }).then((response) => {
            response.json().then((result) => {
                this.setState({
                    response: result.message
                });
                //console.warn("result", result);
            });
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" onChange={(event) => { this.setState({ title: event.target.value }) }} />
                            </Form.Group>

                            <Button variant="primary" onClick={() => { this.post() }}> Post </Button>
                            {
                                this.state.response
                            }
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
