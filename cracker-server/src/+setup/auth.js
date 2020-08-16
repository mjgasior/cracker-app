import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const AUTH0_NAMESPACE = "http://www.crackerapp.com/";

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
};

const verifyToken = (token, callback) => {
  jwt.verify(token, getKey, options, (err, decoded) => callback(err, decoded));
};

export const getUser = (token) =>
  new Promise((resolve, reject) => {
    if (token === "undefined") {
      return resolve({ isLogged: false });
    }

    verifyToken(token, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      const roles = decoded[AUTH0_NAMESPACE + "roles"];
      resolve({ roles, email: decoded.email, isLogged: true });
    });
  }).catch((error) => {
    console.error(error);
    return { isLogged: false };
  });
