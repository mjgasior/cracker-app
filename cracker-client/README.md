# Cracker client

In `nginx` directory there is the `cracker.conf` Nginx configuration file which allows to reach the backend server.

Before starting the app please pepare a `.env` file which will include these values:

    REACT_APP_API_URL="address of Apollo GQL backend"
    REACT_APP_AUTH0_ORIGIN="address of the app seen from Auth0 perspective"
    REACT_APP_AUTH0_DOMAIN="Auth0 user domain"
    REACT_APP_AUTH0_CLIENT_ID="Auth0 user client ID"
    HTTPS=true

Example:

    REACT_APP_API_URL=http://192.168.99.100/api
    REACT_APP_AUTH0_ORIGIN=http://192.168.99.100
    REACT_APP_AUTH0_DOMAIN=domain.region.auth0.com
    REACT_APP_AUTH0_CLIENT_ID=i6mdgjdsjs45asdmfdg3453TADasdkaa
    HTTPS=true

The `HTTPS=true` setting forces [Create React App](https://create-react-app.dev/docs/using-https-in-development/) to work in https. Use this instruction to generate [SSL](https://medium.com/the-new-control-plane/generating-self-signed-certificates-on-windows-7812a600c2d8) certificates.

## Snippets:

- `git update-index --assume-unchanged FILE_NAME` - [keep a file in the repository but make Git ignore changes](https://stackoverflow.com/questions/9794931/keep-file-in-a-git-repo-but-dont-track-changes "Stack Overflow answer")
- `set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start` - add temporary enviroment variable in Windows cmd.exe
- `($env:REACT_APP_NOT_SECRET_CODE = "abcdef") -and (npm start)` - add temporary enviroment variable in Windows Powershell
- `yarn add <package> -D` to add development dependency

## Run production build with Docker Compose:

For Docker Compose instructions refer to `cracker-product` repository.

## Run production build with Docker:

1. `docker build -t cracker-client:v1 .` - build the client image
2. `docker network create --driver bridge crackernet` - create the isolated network for Cracker app
3. `docker run -d --net=crackernet --name crackback cracker-server:v1` - run the server image in the isolated network
4. `docker run -d --net=crackernet -p 80:80 cracker-client:v1` - run the client image with Nginx proxy in the isolated network, but with exposed port 80
5. `docker-machine ip default` - the website should be available at this IP

## Packages:

- `@apollo/react-hooks` - integration with Apollo based on React hooks
- `antd` - Ant Design is a UI design language and React UI components library (I usually used [Material UI](https://material-ui.com/) but this time I wanted to try out something new)
- `apollo-boost` - package containing everything you need to set up Apollo Client (bare `@apollo/client` was lacking a comfortable way of [adding authorization header](https://www.apollographql.com/docs/react/networking/authentication/#header "Apollo GQL docs") to all GQL requests)
- `auth0-js` - client side JavaScript toolkit for Auth0 authorization API
- `graphql` - the JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook
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
- [Auth0 with React and Apollo](https://auth0.com/blog/develop-modern-apps-with-react-graphql-apollo-and-add-authentication/)
- [Dockerize React with Nginx](https://medium.com/@shakyShane/lets-talk-about-docker-artifacts-27454560384f)
- [How to run React app inside Docker with env vars](https://github.com/facebook/create-react-app/issues/982 "Create React App GitHub issues")
- [Leaflet with React](https://blog.logrocket.com/how-to-use-react-leaflet/)
- [Serve static files through Nginx in Docker (online exercise)](https://www.katacoda.com/courses/docker/create-nginx-static-web-server "Katacoda online courses")
- [Readme.md markdown cheatsheet](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md)
