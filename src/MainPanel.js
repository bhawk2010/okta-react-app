import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';

import AuthzFrame from './AuthzFrame';

import OktaAuth from '@okta/okta-auth-js';

class MainPanel extends Component {
   constructor(props) {
    super(props);
    
    this.state = {
          authClient: OktaAuth({url: 'https://your-org.oktapreview.com/oauth2/auth-server-id',
                              clientId: 'client-app-id',
                              redirectUri: 'http://your-app.domain.com/route-x' 
                              
                }),              
      options: {
        responseType: ['id_token', 'token'],
        scopes: ['openid', 'profile', 'email'],
        nonce: 'client-genetated-value',
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
