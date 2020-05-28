echo -e "\e[93;104mCracker app scripts\e[0m\n"

if [ -z ${1+x} ]; then 
    echo -e "\e[91mIP address is unset!\e[0m";
    read
    exit
else 
    echo "IP address is set to '$1'.";
fi

echo -e "\n\e[92mUpload will be perfomred on $1 Lightsail instance"
echo -e "\e[92mCurrent working directory:\e[0m"
pwd

echo -e "\n\e[92mFiles in current working directory:\e[0m"
ls

echo -e "\n\e[92mCopying database dump to Lightsail instance\e[0m"
scp -r ./dump ubuntu@$1:./

echo -e "\n\e[92mRestoring dump in MongoDB Docker container\e[0m"
ssh ubuntu@$1 "docker cp ./dump cracker-db:./ \
    && docker exec cracker-db mongorestore ./dump/crackerappdb/*.bson"

echo -e "\n\e[92mRemoving dump files from Docker and instance\e[0m"
ssh ubuntu@$1 "docker exec cracker-db rm -rf ./dump \
    && rm -rf ./dump"

echo -e "\e[96mPress any key to exit...\e[0m"
read