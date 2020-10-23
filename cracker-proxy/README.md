# Cracker development proxy

This directory contains a configuration file for a development proxy which functions mainly as the point of [SSL termination](https://avinetworks.com/glossary/ssl-termination/) (going from encrypted HTTPS to unecrypted HTTP).

If there are too many logs, one can delete them by entering the container:

1. Run `docker exec -it cracker-proxy-dev sh`.
2. Go to logs location `cd /var/log/nginx`.
3. List the contents with `ls`.
4. Remove files present there with `rm access.log error.log`.
5. Leave container with `exit`.
