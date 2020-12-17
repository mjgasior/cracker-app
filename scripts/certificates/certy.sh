# curl -o /srv/docker/certy.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/scripts/certificates/certy.sh
# curl -o /srv/docker/certy.sh  https://raw.githubusercontent.com/mjgasior/cracker-app/feature/%2369-ssl-cert/scripts/certificates/certy.sh

docker run -it --rm --name certbot \
    -v "/data/certbot/conf:/etc/letsencrypt" \
    -v "/data/certbot/www:/var/www/certbot" \
    certbot/certbot certonly