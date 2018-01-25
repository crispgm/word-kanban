// Auth with JWT of auth0

import auth0 from 'auth0-js';
import { route } from 'preact-router';

export default class Auth {
  constructor() {
    let redirectUri = 'http://localhost:9000/callback';
    if (process.env.NODE_ENV === 'production') {
      redirectUri = 'https://word-kanban.herokuapp.com/callback';
    }
    this.auth0 = new auth0.WebAuth({
      domain: 'crispgm.au.auth0.com',
      clientID: '6PLoLj3tLQjtaCbwN14i1K7Z1p9VXNHY',
      redirectUri: redirectUri,
      audience: 'api.word-kanban.words',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        route('/');
      } else if (err) {
        route('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    route('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    route('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
