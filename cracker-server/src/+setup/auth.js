import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export const verifyToken = (bearerToken) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  function getJwksClientKey(header, callback) {
    client.getSigningKey(header.kid, function (error, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((resolve, reject) => {
    console.log(`Token to be verified ${bearerToken}`);
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      }
    );
  });
};
