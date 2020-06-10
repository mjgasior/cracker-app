echo -e "\e[93;104mCracker app scripts\e[0m\n"

# Build, tag and push new images
echo -e "\n\e[92mBuild new images\e[0m"
docker-compose -f docker-compose.prod.yml build

echo -e "\n\e[92mTag cracker-server\e[0m"
docker tag cracker-app_cracker-server mjgasior/cracker-server:0.0.1

echo -e "\n\e[92mPush cracker-client\e[0m"
docker push mjgasior/cracker-server:0.0.1

echo -e "\n\e[92mTag cracker-client\e[0m"
docker tag cracker-app_cracker-client mjgasior/cracker-client:0.0.3

echo -e "\n\e[92mPush cracker-client\e[0m"
docker push mjgasior/cracker-client:0.0.3

echo -e "\e[96mPress any key to exit...\e[0m"
read