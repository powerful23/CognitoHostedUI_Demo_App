import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class CustomButton extends React.Component {
  signIn() {
    const config = Auth.configure();
    const { 
        domain,  
        redirectSignIn, 
        redirectSignOut,
        responseType } = config.oauth;

    const clientId = config.userPoolWebClientId;
    // The url of the Cognito Hosted UI
    const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;
    // If you only want to log your users in with Google or Facebook, you can construct the url like:
    const url_to_google = 'https://' + domain + '/oauth2/authorize?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Google';
    const url_to_facebook = 'https://' + domain + '/oauth2/authorize?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Facebook';

    // Launch hosted UI
    // window.location.assign(url);

    // Launch Google/Facebook login page
    // window.location.assign(url_to_google);
    window.location.assign(url_to_facebook);
  }

  render() {
    return (
      <button onClick={this.signIn}>
        Customized Login
      </button>
    )
  }
}

export default CustomButton;