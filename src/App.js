import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OAuthButton from './OAuthButton';
import CustomButton from './CustomButton';
import Amplify, {Auth, Hub} from 'aws-amplify';
import aws_exports from './aws-exports';


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
    this.onHubCapsule = this.onHubCapsule.bind(this);
    this.signOut = this.signOut.bind(this);
    Hub.listen('auth', this);
    this.state = {
      authState: 'loading'
    }
  }

  // You need to call this method to tell if you are signed in or not
  componentDidMount() {
    console.log('on mount');
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      console.log(e);
      this.setState({authState: 'signIn'});
    });
  }

  // listen on events so when you are redirected back from Hosted UI, 
  // you can know if you are signed in or not
  onHubCapsule(capsule) {
    console.log(capsule);
    const { channel, payload, source } = capsule;
    if (channel === 'auth') {
      switch (payload.event) {
        case 'signIn':
          console.log('signed in');
          this.setState({authState: 'signedIn'});
          break;
        case 'signIn_failure':
          console.log('not signed in');
          this.setState({authState: 'signIn'});
          break;
        default:
          break;
      }
    }
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    // render different screens by auth state
    const { authState } = this.state;
    return (
      <div className="App">
        {authState === 'loading' && (<div>loading...</div>)}
        {authState === 'signIn' && <CustomButton/>}
        {authState === 'signedIn' && <button onClick={this.signOut}>Sign out</button>}
      </div>
    );
  }
}

export default App;
