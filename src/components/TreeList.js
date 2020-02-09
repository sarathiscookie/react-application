import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default class TreeList extends Component {

    constructor() {

        super();

        this.state = {
            list: null,
        };

    }

    componentDidMount() {

        const localStorageToken = JSON.parse(localStorage.getItem('login'));

        fetch('http://restapiproject.test/api/lists', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorageToken.store}`
            }
          }).then((response) => {
            response.json().then((result) => {
                this.setState({ list: result })
            })
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        {
                            this.state.list ?
                                <ListGroup>
                                    {this.state.list.map(item => (
                                        <ListGroup.Item key={item.id}>{item.title}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                                : <div>Please wait...</div>
                        }
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

