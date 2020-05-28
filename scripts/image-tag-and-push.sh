echo -e "\e[93;104mCracker app scripts\e[0m\n"

if [ -z ${1+x} ]; then 
    echo -e "\e[91mCracker server image ID is unset!\e[0m";
    read
    exit
else 
    echo "Cracker server image ID is set to '$1'.";
fi

if [ -z ${2+x} ]; then 
    echo -e "\e[91mCracker client image ID is unset!\e[0m";
    read
    exit
else 
    echo "Cracker client image ID is set to '$2'.";
fi

echo -e "\n\e[92mTag cracker-server\e[0m"
docker tag $1 mjgasior/cracker-server:0.0.1

echo -e "\n\e[92mPush cracker-client\e[0m"
docker push mjgasior/cracker-server:0.0.1

echo -e "\n\e[92mTag cracker-client\e[0m"
docker tag $2 mjgasior/cracker-client:0.0.3

echo -e "\n\e[92mPush cracker-client\e[0m"
docker push mjgasior/cracker-client:0.0.3

echo -e "\e[96mPress any key to exit...\e[0m"
read