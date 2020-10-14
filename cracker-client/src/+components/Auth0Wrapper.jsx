import React, { useCallback } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";

const Auth0WrapperBase = ({ history, children }) => {
  const onRedirectCallback = useCallback(
    (appState) => {
      history.push(appState?.returnTo || window.location.pathname);
    },
    [history]
  );

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={process.env.REACT_APP_AUDIENCE}
    >
      {children}
    </Auth0Provider>
  );
};

export const Auth0Wrapper = withRouter(Auth0WrapperBase);