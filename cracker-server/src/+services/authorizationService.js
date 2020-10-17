import { verifyToken } from "./../+setup/auth";

const getTokenWithouthBearer = (authorizationHeader) => {
  return authorizationHeader.split(" ")[1];
};

const isPayloadValid = (payload) => {
  return payload && payload.sub;
};

export const getIsAuthenticated = async (req) => {
  let isAuthenticated = false;
  try {
    const authorizationHeader = req.headers.authorization || "";
    if (authorizationHeader) {
      const token = getTokenWithouthBearer(authorizationHeader);
      const payload = await verifyToken(token);
      isAuthenticated = isPayloadValid(payload) ? true : false;
    }
  } catch (error) {
    console.error(error);
  }
  return isAuthenticated;
};
