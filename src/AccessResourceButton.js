import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Navbar, Grid, Row, Col} from 'react-bootstrap';

import MainPanel from './MainPanel';

class AccessResourceButton extends Component {
  constructor(props) {
    super(props);
    this.state = {showPanel: false,
                  isRedirected: (this.props.isRedirected === "true")
                };
    this.handlePanel = this.handlePanel.bind(this);
  }
  
  handlePanel() {
    this.setState(prevState => ({
        showPanel: !prevState.showPanel
      }));
  } 
  render() {
    return (
    <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">BCBSA</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>          
        </Navbar>

        <Jumbotron>
          <Grid>
            <Row>
                <Col><h3>BCBSA Secure Application Demo.</h3></Col>
            </Row>            
            <Row>
                <Col><Button bsStyle="success" onClick={this.handlePanel}>Access Secure Resource</Button></Col>
            </Row>
          </Grid>
            { this.state.isRedirected || this.state.showPanel ? <MainPanel isRedirected={this.props.isRedirected}/> : null }
        </Jumbotron>

    </div>

    );
  }
}

export default AccessResourceButton;
