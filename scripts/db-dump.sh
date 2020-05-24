echo -e "\e[93;104mCracker app scripts\e[0m\n"

echo -e "\n\e[92mPreparing a MongoDB dump\e[0m"
winpty docker exec -it cracker-db-dev sh -c 'mongodump && exit'

echo -e "\n\e[92mCopying dump from Docker container\e[0m"
docker cp cracker-db-dev:/dump ./dump

echo -e "\e[96mPress any key to exit...\e[0m"
read