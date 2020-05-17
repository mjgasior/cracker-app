import React from "react";
import ReactDOM from "react-dom";
import { client, ApolloProvider } from "./+utils/apolloSetup";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./index.css";
import App from "./App";
import { theme } from "./+utils/theme";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
