import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card, ListGroup } from 'react-bootstrap';
import './App.css';

class App extends Component {

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
        console.warn("result", result);
        localStorage.setItem('login', JSON.stringify({
          login: true,
          store: result.token
        }));
        this.storeCollector();
      });
    });
  }

  // Storing title
  post() {
    let token = `Bearer ${this.state.store.store}`;

    console.log(token);

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
        console.warn("result", result);
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          {
            !this.state.login ?
              <Row className="justify-content-md-center">
                <Col md={2}></Col>
                <Col md={8}>
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
                </Col>
                <Col md={2}></Col>
              </Row>
              :
              <Row className="justify-content-md-center">
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group controlId="formTitle">
                          <Form.Label>Title</Form.Label>
                          <Form.Control type="text" placeholder="Enter title" onChange={(event) => { this.setState({ title: event.target.value }) }} />
                        </Form.Group>

                        <Button variant="primary" onClick={() => { this.post() }}> Post </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={9}>
                  <Card>
                    <Card.Header>Listing Data</Card.Header>
                    <Card.Body>
                    
                      {
                        (this.state.response) ? <Card>
                          <Card.Body>{this.state.response}</Card.Body>
                        </Card> : ''
                      }

                      <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
          }
        </Container>
      </div>
    );
  }
}

export default App;
