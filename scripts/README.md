# Cracker scripts

Initial script for a new AWS Lightsail instance:

    curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh
    chmod +x ./lightsail-compose.sh
    ./lightsail-compose.sh

- `db-drop.sh` - drops the MongoDB database that resides in the container
- `db-dump.sh` - creates a database dump from a local Docker container MongoDB in current folder
- `db-upload.sh` - not yet ready - will upload the database dump to Lightsail instance (this script needs ip address as an argument, for example `.\scripts\db-upload.sh 18.184.225.8`)
- `new-instance.sh` - this script creates a new \$3.50 plan (nano plan) Ubuntu 16 instance on Lightsail and allocates a new static IP and attaches it to the instance
- `release.sh` - builds, tags and pushes image of `cracker-server` and `cracker-client` and releases it to the Lightsail instance (this script needs a pre-allocated static IP in Lightsail named `Cracker-app-ip` - you can get such address in the [Netwroking tab](https://lightsail.aws.amazon.com/ls/webapp/home/networking))
- `setup.sh` - allocates static IP, releases a new version of images with the IP, pushes them to Docker Hub and creates a new instance on Lightsail
- `wipe.sh` - deletes the Lightsail instance, detaches the static IP, but doesn't delete the static IP (you need to delete it manually because AWS will charge you after an hour of having a detached static IP)

## AWS CLI for Lightsail:

If on Windows, install the [AWS CLI in Git Bash](https://stackoverflow.com/questions/53015630/bash-aws-command-not-found-on-windows-7-in-git-bash).

- [configure AWS CLI](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/lightsail-how-to-set-up-access-keys-to-use-sdk-api-cli)
- [documentation](https://docs.aws.amazon.com/cli/latest/reference/lightsail/index.html)
- `aws lightsail get-blueprints` - returns blueprints for Lightsail instance
- `aws lightsail create-instances --instance-names Cracker-app --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0` - create the \$3.50 (nano plan) Ubuntu 16 instance

## Upload local MongoDB to Lightsail instance:

1. Run local `docker-compose.yml` in `cracker-product` directory to turn on the local development mode.
2. `docker exec -it cracker-db-dev sh` - turn on shell in MongoDB container (instructions created with help of an article by [Joebbrien Bundabunda](https://medium.com/faun/how-to-backup-docker-containered-mongo-db-with-mongodump-and-mongorestore-b4eb1c0e7308))
3. `mongodump –-out /name_of_directory/` - create a binary export of the contents of a database ([docs](https://docs.mongodb.com/manual/reference/program/mongodump/))
4. `docker cp cracker-db-dev:/name_of_directory ./` - copy the contents of the backup directory to the host (everything will be copied to the current `pwd` working directory)
5. `scp -r ./ ubuntu@ip.of.lightsail.instance:./` - copy files from local host to Lightsail instance (for example `scp -r ./backup21052020 ubuntu@18.196.197.102:./`)
6. `ssh ubuntu@ip.of.lightsail.instance` - get to the Lightsail instance (the files should be uploaded to the `root` directory, so `ls` should list the folder with backup there)
7. `docker cp ./ cracker-db:./` - copy MongoDB backup from instance host to Docker container (the directory with backup should be present at the very top of the tree)
8. `docker exec -it cracker-db sh` - turn on shell on Lightsail instance in MongoDB container
9. `mongorestore name_of_directory/crackerappdb/*.bson` - restore the `crackerappdb` database in the instance

## Manually clean up the database:

1. Enter the docker container with `docker exec -it cracker-db mongo`.
2. You can view the list of dbs with `db list`. Invoke `use crackerappdb` to switch to Cracker database.
3. Use `db.dropDatabase()` to drop the database.
4. Use `exit` to exit docker container.

## Resources:

- [Bash formatting](https://misc.flogisoft.com/bash/tip_colors_and_formatting)
- [Connect with Lightsail instance via SSH](https://www.youtube.com/watch?time_continue=34&v=5xVquS3lEGM&feature=emb_logo)
- [How to drop MongoDB database](https://www.tutorialkart.com/mongodb/mongodb-delete-database/)
