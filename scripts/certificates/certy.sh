docker run -it --rm --name certbot \
    -v "/data/certbot/conf:/etc/letsencrypt" \
    -v "/data/certbot/www:/var/www/certbot" \
    certbot/certbot certonly