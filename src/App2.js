import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, {Auth, Hub} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';

// the Authenticator will render the sign in with AWS button
// if you configured oauth in the Auth module
const oauth = {
  domain: 'wezhuo.auth.us-east-1.amazoncognito.com',
  scope: ['aws.cognito.signin.user.admin'],
  redirectSignIn: 'http://localhost:3000/',
  redirectSignOut: 'http://localhost:3000/',
  responseType: 'code'
};

Amplify.configure(aws_exports);
Auth.configure({oauth});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        You are logged in
      </div>
    );
  }
}

export default withAuthenticator(App, true);
