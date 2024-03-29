# Cracker client

## Table of Contents

- [Setup](#setup)
- [Snippets](#snippets)
- [Packages](#packages)
- [Visual Studio Code extensions](#visual-studio-code-extensions)
- [Resources](#resources)

## Setup

`nginx` directory has the production `cracker.conf` Nginx configuration file which sets up the production entry point and should have SSL certificates for HTTPS. The files should be named `fullchain.pem` for the certificate and `privkey.pem` for the private key.

Before starting the app please pepare a `.env` file which will include these values:

    REACT_APP_API_URL="address of Apollo GQL backend"
    REACT_APP_AUTH0_DOMAIN="Auth0 user domain"
    REACT_APP_AUTH0_CLIENT_ID="Auth0 user client ID"
    REACT_APP_AUDIENCE="http://your.api.identifier"
    HTTPS=true
    SSL_CRT_FILE=fullchain.pem
    SSL_KEY_FILE=privkey.pem

Example:

    REACT_APP_API_URL=http://192.168.99.100/api
    REACT_APP_AUTH0_DOMAIN=domain.region.auth0.com
    REACT_APP_AUTH0_CLIENT_ID=i6mdgjdsjs45asdmfdg3453TADasdkaa
    REACT_APP_AUDIENCE=https://cracker.app
    HTTPS=true
    SSL_CRT_FILE=fullchain.pem
    SSL_KEY_FILE=privkey.pem

The `HTTPS=true` setting forces [Create React App](https://create-react-app.dev/docs/using-https-in-development/) to work in https. If you are using `cracker-proxy`, this setting should be deleted, because the SSL/HTTPS termination is being done there.

## Snippets:

- `git update-index --assume-unchanged FILE_NAME` - [keep a file in the repository but make Git ignore changes](https://stackoverflow.com/questions/9794931/keep-file-in-a-git-repo-but-dont-track-changes "Stack Overflow answer")
- `set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start` - add temporary enviroment variable in Windows cmd.exe
- `($env:REACT_APP_NOT_SECRET_CODE = "abcdef") -and (npm start)` - add temporary enviroment variable in Windows Powershell
- `yarn add <package> -D` to add development dependency

## Packages:

- `@apollo/client` - this single package contains virtually everything you need to set up Apollo Client - it includes the in-memory cache, local state management, error handling, and a React-based view layer
- `@auth0/auth0-react` - the Auth0 React SDK (auth0-react.js) is a JavaScript library for implementing authentication and authorization in React apps with Auth0 (it provides a custom React hook and other Higher Order Components)
- `antd` - Ant Design is a UI design language and React UI components library (I usually used [Material UI](https://material-ui.com/) but this time I wanted to try out something new)
- `apollo-upload-client` - terminating Apollo Link for Apollo Client that allows FileList, File, Blob or ReactNativeFile instances within query or mutation variables and sends GraphQL multipart requests.
- `graphql` - the JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook (provides logic for parsing GraphQL queries)
- `graphql.macro` - allows to compile GraphQL AST (`Abstract Syntax Tree`) at build-time with `babel-plugin-macros` without having to eject `create-react-app` scripts
- `leaflet` - open-source JavaScript library for mobile-friendly interactive maps based on OpenStreetMap
- `leaflet-contextmenu` - just a context menu for Leaflet
- `react-leaflet` - this package provides an abstraction of 🍃 [Leaflet](https://leafletjs.com/reference-1.6.0.html) as ⚛️ React components.
- `react-router-dom` - the standard routing library for React, keeps your UI in sync with the URL - it has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in (these are Document Object Model bindings for React Router)
- `styled-components` - allows to write plain CSS in components without worrying about class name collisions, it helps to write CSS that's scoped to a single component and does not leak to any other element in the page

## Visual Studio Code extensions:

- **Prettier - Code formatter** - an opinionated code formatter that enforces a consistent style by parsing code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary
- **vscode-styled-components** - syntax highlighting for styled-components

## Resources:

- [Adding custom environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/ "Create React App documentation")
- [Dockerize React with Nginx](https://medium.com/@shakyShane/lets-talk-about-docker-artifacts-27454560384f)
- [How to run React app inside Docker with env vars](https://github.com/facebook/create-react-app/issues/982 "Create React App GitHub issues")
- [Leaflet with React](https://blog.logrocket.com/how-to-use-react-leaflet/)
- [Securing GraphQL with Auth0 - server and client](https://youtu.be/vqHkwTWbaUk?t=5455)
- [Serve static files through Nginx in Docker (online exercise)](https://www.katacoda.com/courses/docker/create-nginx-static-web-server "Katacoda online courses")
- [Readme.md markdown cheatsheet](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md)
