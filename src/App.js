import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Auth from "./components/Auth";
import TreeStore from "./components/TreeStore";
import TreeList from "./components/TreeList";
/* import { TreeCreate } from "./components/TreeCreate";
import { TreeUpdate } from "./components/TreeUpdate"; */

const auth = new Auth();

class App extends Component {
  
  render() {
    console.warn(auth.state.login);

    return (
      <div className="App">
        <Container>
          {
            (auth.state.login === false) ?
              <Row className="justify-content-md-center">
                <Col md={2}></Col>
                <Col md={8}>
                  <Auth />
                </Col>
                <Col md={2}></Col>
              </Row>
              :
              <Row className="justify-content-md-center">
                <Col md={3}>
                  <TreeStore />
                </Col>

                <Col md={9}>
                  <TreeList />
                </Col>
              </Row>
          }
        </Container>
      </div>
    );
  }
}

export default App;
