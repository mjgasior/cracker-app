import auth0 from "auth0-js";

const CRACKER_ROLES = "http://www.crackerapp.com/roles";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_AUTH0_ORIGIN}/callback`,
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
      responseType: "token id_token",
      scope: "openid email",
    });

    this.authFlag = "isLoggedIn";
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.roles = authResult.idTokenPayload[CRACKER_ROLES];
    console.log(this.roles);
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  logout() {
    const logoutUrl = process.env.REACT_APP_AUTH0_ORIGIN;
    const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: logoutUrl,
      clientID,
    });
  }

  silentAuth() {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }

  isUserAdmin() {
    console.log(this.roles);
    return this.roles && this.roles.includes("admin");
  }
}

const auth = new Auth();

export default auth;
