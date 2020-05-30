echo -e "\e[93;104mCracker app scripts\e[0m\n"

echo -e "\n\e[92mAllocating new static IP\e[0m"
aws lightsail allocate-static-ip --static-ip-name Cracker-app-ip

echo -e "\n\e[92mCreating new instance\e[0m"
userdata="curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh \
    && chmod +x ./lightsail-compose.sh \
    && ./lightsail-compose.sh"

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

echo -e "\e[96mPress any key to exit...\e[0m"
read