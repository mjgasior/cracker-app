# cracker-app

Monorepo for Cracker app. Go to `cracker-product` for deployment and development manual.

## Snippets:

    curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/lightsail-compose.sh
    chmod +x ./lightsail-compose.sh
    ./lightsail-compose.sh

## AWS CLI for Lightsail:

If on Windows, install the [AWS CLI in Git Bash](https://stackoverflow.com/questions/53015630/bash-aws-command-not-found-on-windows-7-in-git-bash).

- [configure AWS CLI](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/lightsail-how-to-set-up-access-keys-to-use-sdk-api-cli)
- [documentation](https://docs.aws.amazon.com/cli/latest/reference/lightsail/index.html)
- `aws lightsail get-blueprints` - returns blueprints for Lightsail instance
- `aws lightsail create-instances --instance-names Cracker-app --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0` - create the \$3.50 (nano plan) Ubuntu 16 instance

## Upload local MongoDB to Lightsail instance:

- Run local `docker-compose.yml` in `cracker-product` directory to turn on the local development mode.
- `docker exec -it cracker-db sh` - turn on shell in MongoDB container (instructions created with help of an article by [Joebbrien Bundabunda](https://medium.com/faun/how-to-backup-docker-containered-mongo-db-with-mongodump-and-mongorestore-b4eb1c0e7308))
- `mongodump –-out /name_of_directory/` - create a binary export of the contents of a database ([docs](https://docs.mongodb.com/manual/reference/program/mongodump/))
- `docker cp cracker-db:/name_of_directory ./` - copy the contents of the backup directory to the host (everything will be copied to the current `pwd` working directory)
- `scp -r ./ ubuntu@ip.of.lightsail.instance:./` - copy files from local host to Lightsail instance (for example `scp -r ./backup21052020 ubuntu@18.196.197.102:./`)
- `ssh ubuntu@ip.of.lightsail.instance` - get to the Lightsail instance (the files should be uploaded to the `root` directory, so `ls` should list the folder with backup there)
- `docker cp ./ cracker-db:./` - copy MongoDB backup from instance host to Docker container (the directory with backup should be present at the very top of the tree)
- `docker exec -it cracker-db sh` - turn on shell on Lightsail instance in MongoDB container
- `mongorestore name_of_directory/graphqldb/*.bson` - restore the `graphqldb` database in the instance

## Resources:

- [Connect with Lightsail instance via SSH](https://www.youtube.com/watch?time_continue=34&v=5xVquS3lEGM&feature=emb_logo)
- [Deploying Docker Containers on Amazon Lightsail](https://www.youtube.com/watch?v=z525kfneC6E "YouTube video tutorial")
- [Mike G. Coleman Lightsail tutorial demo repository](https://github.com/mikegcoleman/todo)
- [The misunderstood Docker tag: latest](https://medium.com/@mccode/the-misunderstood-docker-tag-latest-af3babfd6375)
