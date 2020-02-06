import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://forkify-api.herokuapp.com/api/search?q=pizza')
      //fetch('http://restapiproject.test/api/lists')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }

  render() {

    let { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading....</div>
    }
    else {
      return (
        <div className="App">

          <Container class="container">
            <Row className="justify-content-md-center">
            <Col></Col>
              <Col>
                <Card>
                  <Card.Header>Login</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Form>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
}

export default App;
