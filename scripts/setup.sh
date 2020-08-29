echo -e "\e[93;104mCracker app scripts\e[0m\n"

docker rm $(docker ps -a -q)

echo -e "\n\e[92mAllocating new static IP\e[0m"
aws lightsail allocate-static-ip --static-ip-name Cracker-app-ip
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

# Create new instance
echo -e "\n\e[92mCreating new instance\e[0m"
userdata="sudo curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh \
    && sudo chmod +x ./lightsail-compose.sh \
    && sudo ./lightsail-compose.sh"

aws lightsail create-instances --instance-names Cracker-app --user-data "$userdata" --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0

echo -e "\n\e[92mWaiting for instance to run...\e[0m"

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    if [[ $awsinstancestate1 == *"stopped"* ]]; then
        echo -e "\n\e[2mIt is stopped.\e[0m"
    elif [[ $awsinstancestate1 == *"pending"* ]]; then
        echo -e "\n\e[2mIt is pending.\e[0m"
    elif [[ $awsinstancestate1 == *"stopping"* ]]; then
        echo -e "\n\e[2mIt is stopping.\e[0m"
    elif [[ $awsinstancestate1 == *"running"* ]]; then
        echo -e "\n\e[39mIt is running! Proceeding with static IP...\e[0m"
        break
    fi

	echo -e "\e[2mRetry $n out of 6.\e[0m"
	((n++))
    sleep 10
done

if [ $n -gt 6 ]; then
    echo -e "\e[91mTimeout! Press any key to exit...\e[0m"
    read
    exit
fi

echo -e "\n\e[92mAttaching new static IP to the instance\e[0m"
aws lightsail attach-static-ip --static-ip-name Cracker-app-ip --instance-name Cracker-app

# Remove configuration files
rm ".env.production"
rm "./cracker-client/.env.production"

echo -e "\e[96mPress any key to exit...\e[0m"
read