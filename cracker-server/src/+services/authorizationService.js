import { verifyToken } from "./../+setup/auth";

const getTokenWithouthBearer = (authorizationHeader) => {
  return authorizationHeader.split(" ")[1];
};

const isPayloadValid = (payload) => {
  return payload && payload.sub;
};

export const getTokenPayload = async (req) => {
  const tokenPayload = { isAuthenticated: false, scope: [] };
  try {
    const authorizationHeader = req.headers.authorization || "";
    if (authorizationHeader) {
      const token = getTokenWithouthBearer(authorizationHeader);
      if (token) {
        const payload = await verifyToken(token);
        tokenPayload.isAuthenticated = isPayloadValid(payload) ? true : false;
        tokenPayload.scope = payload.permissions;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return tokenPayload;
};
