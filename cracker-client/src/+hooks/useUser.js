import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useEffect, useState } from "react";

const CRACKER_DATA = "https://www.crackerapp.com";

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
    if (idToken && idToken[CRACKER_DATA]) {
      const { permissions } = idToken[CRACKER_DATA];
      return {
        email: idToken.email,
        canUpdate: permissions && permissions.includes("create:markers"),
        canDelete: permissions && permissions.includes("delete:markers"),
        canCreate: permissions && permissions.includes("update:markers"),
        isEmailVerified: Boolean(idToken.email_verified),
      };
    }
    return {};
  }, [idToken]);
};
