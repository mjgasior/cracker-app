import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useAccessToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : "";
      setAccessToken(token);
    };
    getToken();
  }, [isAuthenticated, setAccessToken, getAccessTokenSilently]);

  return accessToken;
};
