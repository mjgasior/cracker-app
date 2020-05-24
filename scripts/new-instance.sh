echo -e "\e[93;104m Cracker app scripts \e[0m \n\n"

now=$(date)
echo "$now"

echo -e "\e[92m Creating new instance \e[0m"
userdata="curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh && chmod +x ./lightsail-compose.sh && ./lightsail-compose.sh"

aws lightsail create-instances --instance-names Cracker-app --user-data "$userdata" --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0

echo -e "\e[92m Waiting for instance to run... \e[0m"

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    echo "$awsinstancestate1"

    if [[ $awsinstancestate1 == *"stopped"* ]]; then
        echo -e "\e[37m It is stopped. \e[0m"
    elif [[ $awsinstancestate1 == *"pending"* ]]; then
        echo -e "\e[37m It is pending. \e[0m"
    elif [[ $awsinstancestate1 == *"stopping"* ]]; then
        echo -e "\e[37m It is stopping. \e[0m"
    elif [[ $awsinstancestate1 == *"running"* ]]; then
        echo "It is running! Proceeding with static IP..."
        break
    fi

	echo -e "\e[37m Retry $n out of 6. \e[0m"
	((n++))
    sleep 10
done

if [ $n -gt 6 ]; then
    echo -e "\e[91m Timeout. Press any key to exit... \e[0m"
    read
    exit
fi

echo -e "\e[92m Allocating new static IP \e[0m"
aws lightsail allocate-static-ip --static-ip-name Cracker-app-ip

echo -e "\e[92m Attaching new static IP to the instance \e[0m"
aws lightsail attach-static-ip --static-ip-name Cracker-app-ip --instance-name Cracker-app

echo -e "\e[96m Press any key to exit... \e[0m"

read  