import React from "react";
import ReactDOM from "react-dom";
import "./+localization/i18n";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./index.css";
import { App } from "./App";
import { theme } from "./+utils/theme";
import { Auth0Provider } from "@auth0/auth0-react";
import { GraphQLProvider } from "./+utils/GraphQLProvider";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={process.env.REACT_APP_AUTH0_ORIGIN}
    >
      <GraphQLProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </GraphQLProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
