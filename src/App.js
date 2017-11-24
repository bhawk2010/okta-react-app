import React, { Component } from 'react';

import AccessResourceButton from './AccessResourceButton';

import { Router, Route, browserHistory } from 'react-router';

const Home = React.createClass({
  render() {
    return (
          <AccessResourceButton isRedirected="false" />
    );
  }
})

const Client = React.createClass({
  render() {
    return (
          <AccessResourceButton isRedirected="true" />
    );
  }
})

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/client' component={Client} />
      </Router>
    )
  }
}

export default App;
