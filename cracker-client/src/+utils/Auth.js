import auth0 from "auth0-js";

const AUTH_RESULT = {
  ACCESS_TOKEN: "accessToken",
  APP_STATE: "appState",
  EXPIRES_IN: "expiresIn",
  ID_TOKEN: "idToken",
  ID_TOKEN_PAYLOAD: "idTokenPayload",
  REFRESH_TOKEN: "refreshToken",
  SCOPE: "scope",
  STATE: "state",
  TOKEN_TYPE: "tokenType",
};

const ID_TOKEN_PAYLOAD = {
  CRACKER_ROLES: "https://www.crackerapp.com/roles",
  AT_HASH: "at_hash",
  AUDIENCE: "aud",
  EMAIL: "email",
  IS_EMAIL_VERIFIED: "email_verified",
  EXPIARION: "exp",
  ISSUED_AT: "iat",
  ISSUER: "iss",
  NONCE: "nonce",
  SUBJECT: "sub",
};

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
  }

  login = () => {
    this.auth0.authorize();
  };

  getIdToken = () => {
    return this.idToken;
  };

  handleAuthentication = () => {
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
  };

  setSession = (authResult) => {
    this.idToken = authResult[AUTH_RESULT.ID_TOKEN];

    const idTokenPayload = authResult[AUTH_RESULT.ID_TOKEN_PAYLOAD];

    this.email = idTokenPayload[ID_TOKEN_PAYLOAD.EMAIL];
    this.isEmailVerified = idTokenPayload[ID_TOKEN_PAYLOAD.IS_EMAIL_VERIFIED];
    this.roles = idTokenPayload[ID_TOKEN_PAYLOAD.CRACKER_ROLES];

    localStorage.setItem(this.authFlag, JSON.stringify(true));
  };

  logout = () => {
    const logoutUrl = process.env.REACT_APP_AUTH0_ORIGIN;
    const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: logoutUrl,
      clientID,
    });
  };

  silentAuth = () => {
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
  };

  isAuthenticated = () => {
    return JSON.parse(localStorage.getItem(this.authFlag));
  };

  isUserAdmin = () => {
    return this.roles && this.roles.includes("admin");
  };

  getIsEmailVerified = () => {
    return this.isEmailVerified;
  };

  getEmail = () => {
    return this.email;
  };
}

const auth = new Auth();

export default auth;
