![Cracker app logo](/cracker-client/src/%2Bresources/logo.svg)

# cracker-app

_"Crack Kraków with the Cracker!"_

Big thanks to :octocat: [zgm92](https://github.com/zgm92) for collaboration. :clap:

Big thanks to :octocat: [ASchabowska](https://github.com/ASchabowska) for debugging and dev-ops help. :clap:

Big thanks to :octocat: [thomsa](https://github.com/thomsa) and :octocat: [barlima](https://github.com/barlima) for time and advice. :clap:

![Cracker demo gif made with LICEcap](/crackerdemo.gif)

## Setup:

### Authorization setup:

#### Auth0 account setup:

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

#### Auth0 API setup:

1. Go to `APIs` and click `Create API`.
2. Write `Cracker API` in the `Name` field.
3. Write `https://cracker.app` in the `Identifier` field (it has to be in the HTTP format) and click `Create`.
4. The `Identifier` value should be set in `.env` files under `AUDIENCE` for `cracker-server` and `REACT_APP_AUDIENCE` for `cracker-client`.
5. Go to `Settings` section of the newly created API and scroll to `RBAC Settings` paragraph.
6. Make the `Enable RBAC` switch enabled and after that also enable the `Add Permissions in the Access Token` switch.
7. Scroll to the bottom and click `Save`.
8. Go to `Permissions` and find the `Add a Permission (Scope)` section.
9. Add these permissions (scopes):

| Permission (Scope) |    Description |
| ------------------ | -------------: |
| `update:markers`   | Update markers |
| `delete:markers`   | Delete markers |
| `create:markers`   | Create markers |

Read option is by available for everyone by default.

#### Roles setup for backend side:

1. Open `Users & Roles` section in the main menu and got to `Roles`.
2. Click `+ Create roles` fill the `Name` as `admin`, `Description` as `Cracker app administrator` and click `Create`.
3. The new role should be visible in the table - go to its details/settings by clicking the role `admin` name.
4. Go to `Permissions` section and click `Add permissions`.
5. Select the `Cracker API` (`https://cracker.red` API defined earlier) and either click `All` next to `Select all:` sign, or manually check all the available scopes.
6. Click `Add permissions`.

You can try to define other scopes. No other user roles other than `admin` are currently used. You select the account and then navigate to `Permissions` part.

#### Assign role to a user:

1. Open `Users & Roles` section in the main menu and got to `Roles`.
2. Go to details/settings of `admin` role by clicking its name.
3. Go to `Users` section and click `Add users`.
4. In the `Select users` dropdown start typing the email address of the account you want to assign admin role.
5. After selecting the account, click `Assign`.

You can also do this using the `Roles` section in the `Users & Roles` main menu submenu.

#### Roles setup for client side:

Because there is no easy way to deal with getting the user role or permissions from id token provided by Auth0, we need to write a custom rule which will automatically attach that information to the token. [Parsing access tokens on client side](https://github.com/auth0/auth0-spa-js/issues/23#issuecomment-507794605) for any reason is strongly discouraged due to its backend character, that is why we can't get permissions by just reading them from a decoded access token.

1. Go to `Auth0` and select `Rules` from the menu and click `+ Create rule`.
2. Pick an `</> Empty rule` template.
3. Change the name to `Add Cracker roles to token` and fill the `Script` part with [code from below](https://community.auth0.com/t/accessing-the-permissions-array-in-the-access-token/27559/10):

```
function (user, context, callback) {
  var map = require('array-map');
  var ManagementClient = require('auth0@2.17.0').ManagementClient;
  var management = new ManagementClient({
    token: auth0.accessToken,
    domain: auth0.domain
  });

  var params = { id: user.user_id, page: 0, per_page: 50, include_totals: true };
  management.getUserPermissions(params, function (err, permissions) {
    if (err) {
      console.log('err: ', err);
      callback(err);
    } else {
      var permissionsArr = map(permissions.permissions, function (permission) {
        return permission.permission_name;
      });
      context.idToken['https://www.crackerapp.com'] = {
        permissions: permissionsArr
      };
    }
    callback(null, user, context);
  });
}
```

The `https://` namespaced convention is necessary in Auth0 to [avoid overriding default fields](https://auth0.com/docs/tokens/guides/create-namespaced-custom-claims).

4. After you save, the user access token should have the role property. To verify this try to invoke a request in the browser which will have the `authorization` header with jwt token. Copy the token and verify it on [jwt.io](https://jwt.io/).

### SSL setup:

In production mode, Cracker app uses Nginx to serve the React static files and route traffic to the backend API. This way the HTTPS can be handled in a quite easy way by Nginx itself and that is the point of [SSL termination](https://avinetworks.com/glossary/ssl-termination/) (going from encrypted HTTPS to unecrypted HTTP).

#### Local certification:

A problem emerges in local development mode where we would want to utilize all the benefits of Webpack hosting React files and providing HTTPS. Because Apollo backend API doesn't have HTTPS defined, the direct calls from React client to Apollo backend would be blocked by the browser due to [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content) (one can't call HTTP endpoint while being hosted with HTTPS). That is why we have an additional container - `cracker-proxy` which handles the HTTPS termination for communication with the backend.

1. Use [this](https://medium.com/the-new-control-plane/generating-self-signed-certificates-on-windows-7812a600c2d8) instruction to generate SSL certificates (I have used Windows OpenSSL alternative which is available [here](https://slproweb.com/products/Win32OpenSSL.html) - everything is described in the instruction provided previously). Keep the name of the certificate `fullchain.pem` and `privkey.pem` for the private key, for example, using OpenSSL:

```
openssl req -x509 -newkey rsa:4096 -nodes -keyout fullchain.pem -out privkey.pem -subj “/C=PL/L=Kraków/CN=cracker.red” -days 600
```

- `req` - request a certificate
- `-x509` - a standard defining the format of public key certificates
- `-newkey rsa:4096` - a new private key (`-newkey`) using the RSA algorithm with a 4096-bit key length (`rsa:4096`)
- `-nodes` - private key should be without using a passphrase
- `-keyout` - key filename
- `-out` - certificate filename
- `-subj` - subject - this can have parameters like country (`C=PL`), location (`L=Poland`), organisation (`O=Cracker Ltd`), company name (`CN=www.cracker.red`)
- `-days` - how long should the certificate be valid

2. After you have generated the SSL certificate, you should have two files with `.pem` extensions. Copy them to `./certificates` directory for local development.

#### First production certification:

The website will fail if the certificates are not present. The `nginx` production configuration file expects SSL certificates in a certain directory which is bound to the `cracker.red` domain:

```
ssl_certificate /etc/letsencrypt/live/cracker.red/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/cracker.red/privkey.pem;
```

If you are planning to generte them for your own domain, please change the directory in `./cracker-client/nginx/default.conf` file.

1. Go to you [Lightsail instance](https://lightsail.aws.amazon.com/ls/webapp/home/instances?#).
2. Run `docker run --entrypoint="/bin/sh" -it --name certbot -v /home/ubuntu/certbot/conf:/etc/letsencrypt -v /home/ubuntu/certbot/www:/var/www/certbot certbot/certbot:latest` to get the `certbot` Docker image and start it with the `shell` entry point instead of regular `certbot` process. If you remove the `--entrypoint` argument you will not have to run the next command. Changing the entry point to `shell` is just for control reason, because container would exit just when the `certbot` process ends.
3. Run `certbor certonly` in the `certbot` container.

- Fill the `Domain name:` with your personal domain data (for example `your.domain`). You need a domain to have a proper certification.
- Fill the `Input the webroot for your.domain:` with `/var/www/certbot` route. This directory is where `certbot` puts a verification token that is accessible through `nginx` for the Automatic Certificate Management Environment (ACME) challenge. The HTTP route for that is `/.well-known/acme-challenge/` (you can read more about this process in [HTTP-01 challenge section](https://letsencrypt.org/docs/challenge-types/)).

4. Run `exit` after the process ends successfully like below:

```
IMPORTANT NOTES:

- Congratulations! Your certificate and chain have been saved at:
  /etc/letsencrypt/live/your.domain/fullchain.pem
  Your key file has been saved at:
  /etc/letsencrypt/live/your.domain/privkey.pem
  Your cert will expire on 2021-03-23. To obtain a new or tweaked
  version of this certificate in the future, simply run certbot
  again. To non-interactively renew _all_ of your certificates, run
  "certbot renew"

```

The Docker images are prepared in a way that volumes of `certbot` are mounted to the same location (`/etc/letsencrypt`) as the volumes of `cracker-client`, so the generated certificates are instantly available for the website.

### Apollo GraphQL Playground:

The development proxy listens on `/api` with HTTPS and proxies the traffic with HTTP to port `:4000` of Apollo API. The API and the Apollo GQL playground are still available also with a direct `:4000` call. For example, to try out the Apollo GraphQL Playground you would just use either `http://192.168.99.100:4000/graphql` or `https://192.168.99.100/api` (but here you would need to correct the address in the Playground UI to `https://192.168.99.100/api` instead of `https://192.168.99.100/graphql`).

To try out a call with authorization do this (instruction for Chrome):

1. Run the application.
2. Log in to any account and go to `Markers` section.
3. When in `Markers`, press `F12` to access `DevTools`.
4. Go to `Network` tab and click on an `api` request.
5. Navigate to `Headers` tab of that request and go to `Request Headers` section.
6. You should find the `authorization` header there - copy the whole header with its value (`authorization: Bearer your.access.token`).
7. Enter the Playground as described above.
8. Open `HTTP HEADERS` section in the Playground, write curly braces and paste the authorization header as in the example below (remember about the quotation marks):

```

{
"authorization": "Bearer your.access.token"
}

```

9. Paste the GraphQL request:

```

{
getVersion
}

```

10. Click the run button. You should get a response with API version like below:

```

{
"data": {
"getVersion": "0.0.1"
}
}

```

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
REACT_APP_AUTH0_DOMAIN="Auth0 user domain"
REACT_APP_AUTH0_CLIENT_ID="Auth0 user client ID"
REACT_APP_AUDIENCE="http://your.api.identifier"

```

Remember that while setting `REACT_APP_API_URL` in local development, the client container does not have `nginx` - that means that `cracker-server` is available as `:4000` HTTP and not `/api` HTTPS. Apollo GQL Playground should be available after start at `:4000` (if you use `VirtualBox`, the address can be `http://192.168.99.100:4000/` and for regular `Docker` development either `http://127.0.0.1:4000/` or `http://localhost:4000/`).

On the other hand, the `:3000` port for Webpack React development is mapped in `docker-compose.yml` to standard HTTP `:443` HTTPS port, so the app is visible for Auth0 as (for example) `https://127.0.0.1/` (go to [cracker-client](https://github.com/mjgasior/cracker-app/tree/master/cracker-client) to read more on how to configure custom SSL certificates for HTTPS local development if necessary).

Example of local development `.env` for `cracker-client`:

```

REACT_APP_API_URL=http://127.0.0.1:4000
REACT_APP_AUTH0_DOMAIN=domain.region.auth0.com
REACT_APP_AUTH0_CLIENT_ID=i6mdgjdsjs45asdmfdg3453TADasdkaa
REACT_APP_AUDIENCE=https://cracker.app

```

3. Run `npm install` in `cracker-client`.
4. Run `npm install` in `cracker-server` (if you are running this on Windows, there might be a conflict of environments for `Sharp` package - please read the error section README for `cracker-server`).
5. Run `docker-compose build`.
6. Run `docker-compose up`.

Please remember that you might not have enough space on your virutal machine and get an `fallocate:: No space left on device` error from `cracker-db-dev`. Please run `docker image prune -a` to free disk space.

### Production build:

Please remember that Lightsail has a firewall that doesn't have HTTPS port 443 open by default. This port is closed every time a new instance is being set up, so it is very important to open it to make the app reachable with `https://` address.

You can use the `setup.sh` script to setup a new instance on Lightsail autmatically. Please keep this directory as current work directory (invoke the script as `./scripts/setup.sh`). Remember to have the `aws cli` installed and logged to your account. Also, you will need to be logged to Docker Hub (images in the script are tagged for my repository - you need to change this manually, for example `mjgasior/cracker-server:0.0.1` to `youraccount/cracker-server:0.0.1`)

0. Remember to set up proper Auth0 (client ID and the domain) values in `cracker-client` and `cracker-server`.
1. Put the SSL certificates for HTTPS next to `nginx` configuration in `cracker-client/nginx` directory. The names should be `fullchain.pem` and `privkey.pem` for private key.
2. Set proper IP address of the API in `.env` file in `cracker-client` for new Lightsail instance (for example `REACT_APP_API_URL=https://18.196.197.102/api`).
3. Set `GENERATE_SOURCEMAP=false` in the `.env` file in `cracker-client` to avoid creating source maps for the generated code (the `release.sh` script adds this automatically, so if you need to investigate the source code, delete this value before creating a release - [source maps are downloaded only if the user has React DevTools](https://github.com/facebook/create-react-app/issues/2005#issuecomment-296390495)).
4. Run `docker-compose -f docker-compose.prod.yml build`
5. Run `docker-compose -f docker-compose.prod.yml up`

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

It might be necessary to run a manual installation of `sharp` after a release to run a local development again:

```

npm install --arch=x64 --platform=linuxmusl --target=8.10.0 sharp

```

## Snippets:

- `cat filename` - [display the contents of a text file in the command line](https://unix.stackexchange.com/questions/86321/how-can-i-display-the-contents-of-a-text-file-on-the-command-line "StackExchange answer")
- `curl -X POST https://example.com/resource.cgi` - [cURL a POST request](https://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request "StackExchange answer")
- `docker exec -it container_id_or_name ash` - starting shell in the Docker Alpine container (Alpine doesn't have bash by default)
- `docker system prune -a` - remove all stopped containers, all dangling images, and all unused networks
- `docker rmi $(docker images -a -q)` - remove all images, [the -q flag is used to pass the Image ID](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)
- `docker run -it -p 3000:3000 -e CHOKIDAR_USEPOLLING=true -v $(pwd):/var/www -w "/var/www" node:12.0-alpine yarn start`
- `exit` - to exit out of the docker container bash shell just run this
- `git branch | %{ $_.Trim() } | ?{ $_ -ne 'master' } | %{ git branch -D $_ }` - [delete all branches except master](https://dev.to/koscheyscrag/git-how-to-delete-all-branches-except-master-2pi0)
- `history` allows you to see the `sh` commands history - to run a certain command just write `!` and the number of the command you would want to rerun, for example `!123`
- `stat --format '%a' <file>` - Get the chmod numerical value for a file

## Visual Studio Code extensions:

- **Docker** - extension makes it easy to build, manage and deploy containerized applications from Visual Studio Code
- **GitLens - Git supercharged** - adds the Git capabilities into Visual Studio Code, helps to visualize code authorship, navigate and explore Git repositories

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

```

```
