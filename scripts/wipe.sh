echo -e "\e[93;104mCracker app scripts\e[0m\n"

echo -e "\n\e[92mDetaching static IP\e[0m"
aws lightsail detach-static-ip --static-ip-name Cracker-app-ip
aws lightsail stop-instance --instance-name Cracker-app --force

echo -e "\n\e[92mWaiting for instance to stop...\e[0m"

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    if [[ $awsinstancestate1 == *"stopped"* ]]; then
        echo -e "\n\e[39mIt is stopped! Proceeding with deletion...\e[0m"
        break
    elif [[ $awsinstancestate1 == *"pending"* ]]; then
        echo -e "\n\e[2mIt is pending.\e[0m"
    elif [[ $awsinstancestate1 == *"stopping"* ]]; then
        echo -e "\n\e[2mIt is stopping.\e[0m"
    elif [[ $awsinstancestate1 == *"running"* ]]; then
        echo -e "\n\e[2mIt is running.\e[0m"
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

echo -e "\n\e[92mDeleting instance\e[0m"
aws lightsail delete-instance --instance-name Cracker-app

echo -e "\n\e[92mReleasing static IP\e[0m"
aws lightsail release-static-ip --static-ip-name Cracker-app-ip

echo -e "\e[96mPress any key to exit...\e[0m"
read