import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';

import AuthzFrame from './AuthzFrame';

import OktaAuth from '@okta/okta-auth-js';

class MainPanel extends Component {
   constructor(props) {
    super(props);
    
    this.state = {
          authClient: OktaAuth({url: 'https://bcbsa.oktapreview.com/oauth2/aus9mke3elYu28b8K0h7',
                              clientId: 'nBOS1NRhVQR4cdDBoL1I',
                              redirectUri: 'http://localhost:3000/client' 
//                              redirectUri: 'https://developer.pxcsm.com' 
                              
                }),              
      options: {
        responseType: ['id_token', 'token'],
        // responseType: 'token',
        scopes: ['openid', 'profile', 'email'],
        nonce: 'test10b',
        state: 'test11b'
      }
    };
   }

  render() {
    return (
          <Panel>
            <AuthzFrame isRedirected={this.props.isRedirected}
                        client={this.state.authClient}
                        options={this.state.options}
                        />
          </Panel>
    );
  }
}

export default MainPanel;
