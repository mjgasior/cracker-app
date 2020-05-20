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

## Resources:

- [Deploying Docker Containers on Amazon Lightsail](https://www.youtube.com/watch?v=z525kfneC6E "YouTube video tutorial")
- [Mike G. Coleman Lightsail tutorial demo repository](https://github.com/mikegcoleman/todo)
- [The misunderstood Docker tag: latest](https://medium.com/@mccode/the-misunderstood-docker-tag-latest-af3babfd6375)
