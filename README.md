![Cracker app logo](/cracker-client/src/%2Bresources/logo.svg)

# cracker-app

_"Crack the history of Krakow with the Cracker app!"_

Big thanks to :octocat: [thomsa](https://github.com/thomsa) and :octocat: [barlima](https://github.com/barlima) for time and advice. :clap:

![Cracker demo gif made with LICEcap](/crackerdemo.gif)

## Setup:

### Authorization setup:

1. [Log in](https://auth0.auth0.com/login "Auth0 login page") or [create new account](https://auth0.com/signup "Auth0 signup page") on Auth0 website.
2. Go to `Applications` and click `Create application`.
3. Name it `Cracker`, select `Single Page Web Applications` and click `Create`.
4. Go to `Settings` tab where you can find:
   - Domain (required in `cracker-client` as `REACT_APP_AUTH0_CLIENT_ID` and `cracker-server` as `AUTH0_CLIENT_ID`)
   - Client ID (required in `cracker-client` as `REACT_APP_AUTH0_DOMAIN` and `cracker-server` as `AUTH0_DOMAIN`)
5. Please remember to set the callback URLs in Auth0 (URLs should be separated with a comma):
   - Allowed Callback URLs:
     - `http://localhost:3000/callback` - running app fully locally
     - `http://the.ip.of.docker.machine/callback` - running app as Docker production build
   - Allowed Logout URLs, Allowed Web Origins and Allowed Origins (CORS):
     - `http://localhost:3000/` - running app fully locally
     - `http://the.ip.of.docker.machine/` - running app as Docker production build

### Roles setup:

1. After that, select `Rules` from the menu and click `+ Create rule`.
2. Pick an `</> Empty rule` template.
3. Change the name to `Add Cracker roles to access token` and fill the `Script` part with:

```
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  context.idToken['http://www.crackerapp.com/roles'] = user.app_metadata.roles;
  return callback(null, user, context);
}
```

The `http://` namespaced convention is necessary in Auth0 to [avoid overriding default fields](https://auth0.com/docs/tokens/guides/create-namespaced-custom-claims).

4. Save changes and go to `Users & Roles`. After that select `Users` section.
5. Pick the user that you want to assign the `admin` role and `View details` of the account.
6. Go to `app_metadata` of `Metadata` section and paste this:

```
{
  "roles": [
    "admin"
  ]
}
```

7. After you save, the user access token should have the role property. To verify this try to invoke a request in the browser which will have the `authorization` header with jwt token. Copy the token and verify it on [jwt.io](https://jwt.io/).

### Local development configuration setup:

1. Create a `.env` file in `cracker-server` directory:

```
AUTH0_DOMAIN="Auth0 user domain"
AUTH0_CLIENT_ID="Auth0 user client ID"
```

2. Create a `.env` file in `cracker-client` directory:

```
REACT_APP_API_URL="address of Apollo GQL backend"
REACT_APP_AUTH0_ORIGIN="address of the app seen from Auth0 perspective"
REACT_APP_AUTH0_DOMAIN="Auth0 user domain"
REACT_APP_AUTH0_CLIENT_ID="Auth0 user client ID"
```

Remember that while setting `REACT_APP_API_URL` in local development, the client container does not contain `nginx` - that means that `cracker-server` is available as `:4000` and not `/api`. Apollo GQL Playground should be available after start at `:4000` (if you use `VirtualBox`, the address can be `http://192.168.99.100:4000/` and for regular `Docker` development either `http://127.0.0.1:4000/` or `http://localhost:4000/`).

On the other hand, the `:3000` port for Webpack React development is mapped in `docker-compose.yml` to standard HTTP `:80` port, so the app is visible for Auth0 as (for example) `http://127.0.0.1/` - keep that in mind while setting the `REACT_APP_AUTH0_ORIGIN` value.

Example of local development `.env` for `cracker-client`:

```
REACT_APP_API_URL=http://127.0.0.1:4000
REACT_APP_AUTH0_ORIGIN=http://127.0.0.1
REACT_APP_AUTH0_DOMAIN=domain.region.auth0.com
REACT_APP_AUTH0_CLIENT_ID=i6mdgjdsjs45asdmfdg3453TADasdkaa
```

3. Run `yarn` in `cracker-client`.
4. Run `yarn` in `cracker-server`.
5. Run `docker-compose build`.
6. Run `docker-compose up`.

### Production build:

You can use the `setup.sh` script to setup a new instance on Lightsail autmatically. Please keep this directory as current work directory (invoke the script as `./scripts/setup.sh`). Remember to have the `aws cli` installed and logged to your account. Also, you will need to be logged to Docker Hub (images in the script are tagged for my repository - you need to change this manually, for example `mjgasior/cracker-server:0.0.1` to `youraccount/cracker-server:0.0.1`)

0. Remember to set up proper Auth0 (client ID and the domain) values in `cracker-client` and `cracker-server`.
1. Set proper IP address of the API in `.env` file in `cracker-client` for new Lightsail instance (for example `REACT_APP_API_URL=http://18.196.197.102/api` and `REACT_APP_AUTH0_ORIGIN=http://18.196.197.102`).
2. Run `docker-compose -f docker-compose.prod.yml build`
3. Run `docker-compose -f docker-compose.prod.yml up`

### Setup for completely separate run:

1. Run MongoDB `docker run -p 27017:27017 -it mongo:4.2.6`
2. Configure `cracker-server` to run locally with MongoDB in Docker (set .env in `cracker-server` to have `MONGODB_ADDRESS=192.168.99.100:27017`) and run `yarn start`.
3. Configure `cracker-client` to run locally with `cracker-server` (set .env in `cracker-client` to have `REACT_APP_API_URL=http://localhost:4000/api` and `REACT_APP_AUTH0_ORIGIN=http://localhost:3000`) and run `yarn start`.
4. App should be available at `http://localhost:3000` and [Apollo Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) at `http://localhost:4000/`.

### Push image to Docker Hub:

0. Log yourself in to Docker Hub `docker login`.
1. Build Docker images.
2. Tag them `docker tag 6d15e9c73b54 mjgasior/cracker-client:0.0.3`.
3. Push them `docker push mjgasior/cracker-client:0.0.3`.
4. Use them. :)

## Snippets:

- `cat filename` - [display the contents of a text file in the command line](https://unix.stackexchange.com/questions/86321/how-can-i-display-the-contents-of-a-text-file-on-the-command-line "StackExchange answer")
- `curl -X POST https://example.com/resource.cgi` - [cURL a POST request](https://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request "StackExchange answer")
- `docker exec -it container_id_or_name ash` - starting shell in the Docker Alpine container (Alpine doesn't have bash by default)
- `docker system prune -a` - remove all stopped containers, all dangling images, and all unused networks
- `docker rmi $(docker images -a -q)` - remove all images, [the -q flag is used to pass the Image ID](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)
- `docker run -it -p 3000:3000 -e CHOKIDAR_USEPOLLING=true -v $(pwd):/var/www -w "/var/www" node:12.0-alpine yarn start`
- `exit` - to exit out of the docker container bash shell just run this

## Visual Studio Code extensions:

- **Docker** - extension makes it easy to build, manage and deploy containerized applications from Visual Studio Code
- **GitLens - Git supercharged** - adds the Git capabilities into Visual Studio Code, helps to visualize code authorship, navigate and explore Git repositories

## Errors:

You might get an error regarding the bash and curl packages for Alpine, something like this:

    fetch http://dl-cdn.alpinelinux.org/alpine/v3.4/main/x86_64/APKINDEX.tar.gz
    ERROR: http://dl-cdn.alpinelinux.org/alpine/v3.4/main: temporary error (try again later)

As I found, this might be a [faulty DNS](https://github.com/gliderlabs/docker-alpine/issues/386 "GitHub issues") and a Docker machine restart might work (it fixed the problem for me).

## Resources:

- [Adding custom claims in Auth0](https://auth0.com/docs/api-auth/tutorials/adoption/scope-custom-claims)
- [Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)
- [Docker Tips](https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile)
- [LICEcap for simple animated screen captures](https://www.cockos.com/licecap/)
- [Managing MongoDB on docker with docker-compose](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)
- [Unable to start Docker MongoDB image on Windows with a volume](https://stackoverflow.com/questions/54911021/unable-to-start-docker-mongo-image-on-windows "Stack Overflow question")
