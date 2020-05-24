echo -e "\e[93;104mCracker app scripts\e[0m\n\n"

echo -e "\e[92m\e[49mDetaching static IP\e[0m"
aws lightsail detach-static-ip --static-ip-name Cracker-app-ip

aws lightsail stop-instance --instance-name Cracker-app --force

echo -e "\e[92mWaiting for instance to stop...\e[0m"

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    echo "$awsinstancestate1"

    if [[ $awsinstancestate1 == *"stopped"* ]]; then
        echo -e "\e[39mIt is stopped! Proceeding with deletion..."
        break
    elif [[ $awsinstancestate1 == *"pending"* ]]; then
        echo -e "\e[37mIt is pending."
    elif [[ $awsinstancestate1 == *"stopping"* ]]; then
        echo -e "\e[37mIt is stopping."
    elif [[ $awsinstancestate1 == *"running"* ]]; then
        echo -e "\e[37mIt is running."
    fi

	echo -e "\e[37mRetry $n out of 6."
	((n++))
    sleep 10
done

if [ $n -gt 6 ]; then
    echo -e "\e[91m Timeout. Press any key to exit... \e[0m"
    read
    exit
fi

echo -e "\e[92mDeleting instance\e[37m"
aws lightsail delete-instance --instance-name Cracker-app

echo -e "\e[92mRemember to delete detached static IP"
echo -e "\e[96mPress any key to exit..."
read