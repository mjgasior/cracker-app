import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useEffect, useState } from "react";

const CRACKER_DATA = "https://www.crackerapp.com/roles";

export const useUser = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [idToken, setIdToken] = useState({});

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = await getIdTokenClaims();
        setIdToken(token);
      }
    };
    getToken();
  }, [isAuthenticated, setIdToken, getIdTokenClaims]);

  return useMemo(() => {
    if (idToken) {
      const roles = idToken[CRACKER_DATA];
      return {
        email: idToken.email,
        isAdmin: roles && roles.includes("admin"),
        isEmailVerified: Boolean(idToken.email_verified),
      };
    }
    return {};
  }, [idToken]);
};
