# Getting start

1. `npm install`

2. Put the `aws-exports.js` under `src/`

3. Change the `oauth` configuration in the `App.js`/`App2.js`

4. `npm start`

# Different ways using Cognito Hosted UI with Amplify

## Using Authenticator/withAuthenticator

You can use `withAuthenticator` or `Authenticator` to wrap your app
1. In `src/index.js`, comment out Line 4 and activate Line 5

2. As long as the Auth module is configured with `oauth`, the Authentcator will render the `Sign In with AWS` button.

## Using OAuth HOC

1. In `src/index.js`, comment out Line 5 and activate Line 4

2. In `src/App.js`, comment out Line 79 and activate Line 80

3. In `src/OAuthButton.js`, you can find a React Component wrapped by the `withOAuth` HOC, and the `props.OAuthSignIn` is passed into the `onClick` props in the `button` element in order to jump to the Hosted UI page.

## Using Customized Button

1. In `src/index.js`, comment out Line 5 and activate Line 4

2. In `src/App.js`, comment out Line 80 and activate Line 79

3. In `src/CustomButton.js`, you can switch the url(The Hosted UI, Google Login Page, Facebook Login Page) and assign it to the window location.