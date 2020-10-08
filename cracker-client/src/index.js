import React from "react";
import ReactDOM from "react-dom";
import "./+localization/i18n";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./index.css";
import { App } from "./App";
import { theme } from "./+utils/theme";
import { ApolloWrapper } from "./+components/ApolloWrapper";
import { Auth0Wrapper } from "./+components/Auth0Wrapper";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0Wrapper>
        <ApolloWrapper>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ApolloWrapper>
      </Auth0Wrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
