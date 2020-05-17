import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

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

export const verifyToken = (token, callback) => {
  jwt.verify(token, getKey, options, (err, decoded) => callback(err, decoded));
};
