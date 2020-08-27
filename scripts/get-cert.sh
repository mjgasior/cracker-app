docker ps

winpty docker run -it --rm --name certbot \
    -v "/etc/letsencrypt:./etchere" \
    -v "/var/lib/letsencrypt:./varhere" \
    certbot/certbot certonly

read