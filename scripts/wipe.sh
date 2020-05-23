echo "Detaching static IP"
aws lightsail detach-static-ip --static-ip-name Cracker-app-ip

aws lightsail stop-instance --instance-name Cracker-app --force

echo "Waiting for instance to stop..."

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    echo "$awsinstancestate1"

    if [[ $awsinstancestate1 == *"stopped"* ]]; then
        echo "It is stopped! Proceeding with deletion..."
        break
    elif [[ $awsinstancestate1 == *"pending"* ]]; then
        echo "It is pending."
    elif [[ $awsinstancestate1 == *"stopping"* ]]; then
        echo "It is stopping."
    elif [[ $awsinstancestate1 == *"running"* ]]; then
        echo "It is running."
    fi

	echo "Retry $n out of 6."
	((n++))
    sleep 10
done

if [ $n -gt 6 ]; then
    echo "Timeout. Press any key to exit..."
    read
    exit
fi

echo "Deleting instance"
aws lightsail delete-instance --instance-name Cracker-app

echo "Remember to delete detached static IP"
echo "Press any key to exit..."
read