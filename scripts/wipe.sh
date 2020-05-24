echo -e "\e[93m\e[104mCracker app scripts\n\n"

echo -e "\e[92m\e[49mDetaching static IP\e[37m"
aws lightsail detach-static-ip --static-ip-name Cracker-app-ip

aws lightsail stop-instance --instance-name Cracker-app --force

echo -e "\e[92mWaiting for instance to stop...\e[37m"

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    echo -e "\e[37m$awsinstancestate1"

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
    echo -e "\e[91mTimeout. Press any key to exit..."
    read
    exit
fi

echo -e "\e[92mDeleting instance\e[37m"
aws lightsail delete-instance --instance-name Cracker-app

echo -e "\e[92mRemember to delete detached static IP"
echo -e "\e[96mPress any key to exit..."
read