import React, { Component } from 'react';
import {Button, Col} from 'react-bootstrap';
import {Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import TokenFrame from './TokenFrame';

import OktaAuth from '@okta/okta-auth-js';

  // NOTE: 
  // In case of implicit flow, it is recommended to use introspection 
  // instead of getting the keys and reading the token. 
  // Verify with Okta if getKeys needs to be exposed to a client 


class AuthzFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authClient: this.props.client,              
      options: this.props.options,
      isRedirected: (this.props.isRedirected === "true"),
      responseData: "Auth Response Data",
      aToken: null
    };
    this.sendAuthRequest = this.sendAuthRequest.bind(this);
  }
  componentDidMount() {
      if(this.state.isRedirected) {
        var aClient = this.state.authClient;
        var aResponse = this.state.responseData;
        var that = this;

        aClient.token.parseFromUrl()
          .then(function(token) {
            // token0 = id Token
            // token1 = access token
            that.setState({
              responseData: JSON.stringify(token,null,"\t"),
              aToken: token
            });
        })
        .catch(function(err) {
          // Handle OAuthError
        alert(err);
        });

      }
  }

  sendAuthRequest() {
    // call authorize and get token
    var aClient = this.state.authClient;
    var aOptions = this.state.options;

    aClient.token.getWithRedirect(aOptions);

    console.log("Sending Authorization Request...");

  }
  render() {
    return (
    <Form horizontal>
      <FormGroup controlId="formAuthzButton">
          <Col smOffset={1} sm={10}>
            <Button bsStyle="primary" onClick={this.sendAuthRequest}>Authorization Request</Button>
          </Col>
      </FormGroup>
      <FormGroup controlId="formAuthzResp">
          <Col componentClass={ControlLabel} sm={4}>
            Authorization Response:
          </Col>
        <Col sm={6}>
          <FormControl componentClass="textarea" rows="5" value={this.state.responseData}/>
       </Col>
      </FormGroup>

      {this.state.isRedirected ? 
                  <TokenFrame isRedirected={this.props.isRedirected}
                            client={this.state.authClient}
                            options={this.state.options} 
                            token={this.state.aToken}
                        /> : null
      }

    </Form>

    );
  }
}

export default AuthzFrame;
