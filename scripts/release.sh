echo -e "\e[93;104mCracker app scripts\e[0m\n"

aws lightsail get-static-ip --static-ip-name Cracker-app-ip

read -p "Enter allocated static IP: " static_ip

echo "Static IP: $static_ip"

echo "REACT_APP_API_URL=https://$static_ip/api
REACT_APP_AUTH0_ORIGIN=https://$static_ip" >> ".env.production"

cp ".env.production" "./cracker-client/"

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

# Remove configuration files
rm ".env.production"
rm "./cracker-client/.env.production"

# Access instance and restart
ssh ubuntu@$static_ip "cd ../../srv/docker && docker-compose down \
    && docker pull mjgasior/cracker-client:0.0.3 \
    && docker pull mjgasior/cracker-server:0.0.1 \
    && docker-compose up -d"

echo -e "\e[96mPress any key to exit...\e[0m"
read