![Cracker app logo](/cracker-client/src/%2Bresources/logo.svg)

# cracker-app

_"Crack Kraków with the Cracker!"_

Big thanks to :octocat: [zgm92](https://github.com/zgm92) for collaboration. :clap:

Big thanks to :octocat: [ASchabowska](https://github.com/ASchabowska) for debugging and dev-ops help. :clap:

Big thanks to :octocat: [thomsa](https://github.com/thomsa) and :octocat: [barlima](https://github.com/barlima) for time and advice. :clap:

![Cracker demo gif made with LICEcap](/crackerdemo.gif)

## Setup:

### Authorization setup:

1. [Log in](https://auth0.auth0.com/login "Auth0 login page") or [create new account](https://auth0.com/signup "Auth0 signup page") on Auth0 website.
2. Go to `Applications` and click `Create application`.
3. Name it `Cracker`, select `Single Page Web Applications` and click `Create`.
4. Go to `Settings` tab where you can find:
   - Domain (required in `cracker-client` as `REACT_APP_AUTH0_CLIENT_ID`)
   - Client ID (required in `cracker-client` as `REACT_APP_AUTH0_DOMAIN` and `cracker-server` as `AUTH0_DOMAIN`)
5. Please remember to set the callback URLs in Auth0 (URLs should be separated with a comma):
   - Allowed Callback URLs:
     - `https://localhost:3000/callback` - running app fully locally
     - `https://the.ip.of.docker.machine/callback` - running app as Docker production build
   - Allowed Logout URLs, Allowed Web Origins and Allowed Origins (CORS):
     - `https://localhost:3000/` - running app fully locally
     - `https://the.ip.of.docker.machine/` - running app as Docker production build
6. Go to `APIs` and click `Create API`.
7. Write `Cracker API` in the `Name` field.
8. Write `https://cracker.app` in the `Identifier` field (it has to be in the HTTP format) and click `Create`.
9. The `Identifier` value should be set in `.env` files under `AUDIENCE` for `cracker-server` and `REACT_APP_AUDIENCE` for `cracker-client`.

### Roles setup:

1. Go to `Auth0` and select `Rules` from the menu and click `+ Create rule`.
2. Pick an `</> Empty rule` template.
3. Change the name to `Add Cracker roles to token` and fill the `Script` part with:

```
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  context.idToken['https://www.crackerapp.com/roles'] = user.app_metadata.roles;
  return callback(null, user, context);
}
```

The `https://` namespaced convention is necessary in Auth0 to [avoid overriding default fields](https://auth0.com/docs/tokens/guides/create-namespaced-custom-claims).

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

### SSL setup:

In production mode, Cracker app uses Nginx to serve the React static files and route traffic to the backend API. This way the HTTPS can be handled in a quite easy way by Nginx itself and that is the point of [SSL termination](https://avinetworks.com/glossary/ssl-termination/) (going from encrypted HTTPS to unecrypted HTTP).

A problem emerges in local development mode where we would want to utilize all the benefits of Webpack hosting React files and providing HTTPS. Because Apollo backend API doesn't have HTTPS defined, the direct calls from React client to Apollo backend would be blocked by the browser due to [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content) (one can't call HTTP endpoint while being hosted with HTTPS). That is why we have an additional container - `cracker-proxy` which handles the HTTPS termination for communication with the backend.

The proxy listens on `:5000` port with HTTPS and proxies the traffic with HTTP to port `:4000` of Apollo API. The API and the Apollo GQL playground are still available with a direct `:4000` call.

1. Use [this](https://medium.com/the-new-control-plane/generating-self-signed-certificates-on-windows-7812a600c2d8) instruction to generate SSL certificates (I have used Windows OpenSSL alternative which is available [here](https://slproweb.com/products/Win32OpenSSL.html) - everything is described in the instruction provided previously). Keep the name of the certificate `fullchain.pem` and `privkey.pem` for the private key, for example, using OpenSSL:

   openssl req -x509 -newkey rsa:4096 -nodes -keyout crackerssl.key -out crackerssl.crt -subj “/C=PL/L=Kraków/CN=cracker.red” -days 600

- `req` - request a certificate
- `-x509` - a standard defining the format of public key certificates
- `-newkey rsa:4096` - a new private key (`-newkey`) using the RSA algorithm with a 4096-bit key length (`rsa:4096`)
- `-nodes` - private key should be without using a passphrase
- `-keyout` - key filename
- `-out` - certificate filename
- `-subj` - subject - this can have parameters like country (`C=PL`), location (`L=Poland`), organisation (`O=Cracker Ltd`), company name (`CN=www.cracker.red`)
- `-days` - how long should the certificate be valid

2. After you have generated the SSL certificate, you should have two files with `.crt` and `.key` extensions. Copy them to `./cracker-client/nginx` and `./cracker-proxy/nginx` directories.

This method is only for local development. To have a proper cerificate for production you would need to refer to [this repository](https://github.com/mjgasior/nginx-certbot).

### Local development configuration setup:

1. Create a `.env` file in `cracker-server` directory:

```
AUTH0_DOMAIN="Auth0 user domain"
AUDIENCE="http://your.api.identifier"
CORS_WHITELIST="Client origin address"
```

Example of local development `.env` for `cracker-server`:

```
AUTH0_DOMAIN=domain.region.auth0.com
AUDIENCE=https://cracker.app
CORS_WHITELIST="https://example.com https://192.168.99.100"
```

2. Create a `.env` file in `cracker-client` directory:

```
REACT_APP_API_URL="address of Apollo GQL backend"
REACT_APP_AUTH0_REDIRECT="address of the app seen from Auth0 perspective"
REACT_APP_AUTH0_DOMAIN="Auth0 user domain"
REACT_APP_AUTH0_CLIENT_ID="Auth0 user client ID"
REACT_APP_AUDIENCE="http://your.api.identifier"
```

Remember that while setting `REACT_APP_API_URL` in local development, the client container does not have `nginx` - that means that `cracker-server` is available as `:4000` HTTP and not `/api` HTTPS. Apollo GQL Playground should be available after start at `:4000` (if you use `VirtualBox`, the address can be `http://192.168.99.100:4000/` and for regular `Docker` development either `http://127.0.0.1:4000/` or `http://localhost:4000/`).

On the other hand, the `:3000` port for Webpack React development is mapped in `docker-compose.yml` to standard HTTP `:443` HTTPS port, so the app is visible for Auth0 as (for example) `https://127.0.0.1/` - keep that in mind while setting the `REACT_APP_AUTH0_REDIRECT` value (go to [cracker-client](https://github.com/mjgasior/cracker-app/tree/master/cracker-client) to read more on how to configure custom SSL certificates for HTTPS local development if necessary).

Example of local development `.env` for `cracker-client`:

```
REACT_APP_API_URL=http://127.0.0.1:4000
REACT_APP_AUTH0_REDIRECT=https://127.0.0.1
REACT_APP_AUTH0_DOMAIN=domain.region.auth0.com
REACT_APP_AUTH0_CLIENT_ID=i6mdgjdsjs45asdmfdg3453TADasdkaa
REACT_APP_AUDIENCE=https://cracker.app

```

3. Run `yarn` in `cracker-client`.
4. Run `yarn` in `cracker-server`.
5. Run `docker-compose build`.
6. Run `docker-compose up`.

### Production build:

Please remember that Lightsail has a firewall that doesn't have HTTPS port 443 open by default. This port is closed every time a new instance is being set up, so it is very important to open it to make the app reachable with `https://` address.

You can use the `setup.sh` script to setup a new instance on Lightsail autmatically. Please keep this directory as current work directory (invoke the script as `./scripts/setup.sh`). Remember to have the `aws cli` installed and logged to your account. Also, you will need to be logged to Docker Hub (images in the script are tagged for my repository - you need to change this manually, for example `mjgasior/cracker-server:0.0.1` to `youraccount/cracker-server:0.0.1`)

0. Remember to set up proper Auth0 (client ID and the domain) values in `cracker-client` and `cracker-server`.
1. Put the SSL certificates for HTTPS next to `nginx` configuration in `cracker-client/nginx` directory. The names should be `fullchain.pem` and `privkey.pem` for private key.
2. Set proper IP address of the API in `.env` file in `cracker-client` for new Lightsail instance (for example `REACT_APP_API_URL=https://18.196.197.102/api` and `REACT_APP_AUTH0_REDIRECT=https://18.196.197.102`).
3. Run `docker-compose -f docker-compose.prod.yml build`
4. Run `docker-compose -f docker-compose.prod.yml up`

### Push image to Docker Hub:

0. Log yourself in to Docker Hub `docker login`.
1. Build Docker images.
2. Tag them `docker tag 6d15e9c73b54 mjgasior/cracker-client:0.0.3`.
3. Push them `docker push mjgasior/cracker-client:0.0.3`.
4. Use them. :)

### Release from branch:

If you want to release from branch, you can use the `./scripts/release.sh` script:

1. Run `.\scripts\release.sh` (Windows slash notation here).
2. Connect through SSH to Lightsail instance.
3. Run `sudo curl -o /srv/docker/docker-compose.yml https://raw.githubusercontent.com/mjgasior/cracker-app/BRANCH_NAME/deploy/docker-compose.yml`.
4. Go to `/srv/docker` with `cd /srv/docker`.
5. Run `docker-compose down` and then `docker-compose up`.

## Snippets:

- `cat filename` - [display the contents of a text file in the command line](https://unix.stackexchange.com/questions/86321/how-can-i-display-the-contents-of-a-text-file-on-the-command-line "StackExchange answer")
- `curl -X POST https://example.com/resource.cgi` - [cURL a POST request](https://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request "StackExchange answer")
- `docker exec -it container_id_or_name ash` - starting shell in the Docker Alpine container (Alpine doesn't have bash by default)
- `docker system prune -a` - remove all stopped containers, all dangling images, and all unused networks
- `docker rmi $(docker images -a -q)` - remove all images, [the -q flag is used to pass the Image ID](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)
- `docker run -it -p 3000:3000 -e CHOKIDAR_USEPOLLING=true -v $(pwd):/var/www -w "/var/www" node:12.0-alpine yarn start`
- `git branch | %{ $_.Trim() } | ?{ $_ -ne 'master' } | %{ git branch -D $_ }` - [delete all branches except master](https://dev.to/koscheyscrag/git-how-to-delete-all-branches-except-master-2pi0)
- `exit` - to exit out of the docker container bash shell just run this
- `stat --format '%a' <file>` - Get the chmod numerical value for a file

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
- [Docker tips](https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile)
- [Dropping Mongo database manually](https://www.tutorialkart.com/mongodb/mongodb-delete-database/)
- [Dropping Mongo database with a shell script](https://stackoverflow.com/questions/40907133/how-do-i-drop-a-mongodb-collection-from-the-command-line)
- [How to create SSL certificates for development](https://medium.com/better-programming/how-to-create-ssl-certificates-for-development-861237235933)
- [LICEcap for simple animated screen captures](https://www.cockos.com/licecap/)
- [Managing MongoDB on docker with docker-compose](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)
- [Nginx and Let’s Encrypt with Docker in Less Than 5 Minutes](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)
- [Unable to start Docker MongoDB image on Windows with a volume](https://stackoverflow.com/questions/54911021/unable-to-start-docker-mongo-image-on-windows "Stack Overflow question")
