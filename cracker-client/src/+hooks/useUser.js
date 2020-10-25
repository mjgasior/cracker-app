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

      let canUpdate = false,
        canDelete = false,
        canCreate = false;

      if (permissions) {
        canUpdate = permissions.includes("create:markers");
        canDelete = permissions.includes("delete:markers");
        canCreate = permissions.includes("update:markers");
      }

      const isAdmin = canCreate && canDelete && canUpdate;

      return {
        email: idToken.email,
        canUpdate,
        canDelete,
        canCreate,
        isAdmin,
        isEmailVerified: Boolean(idToken.email_verified),
      };
    }
    return {};
  }, [idToken]);
};
