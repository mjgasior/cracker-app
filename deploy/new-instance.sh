now=$(date)
echo "$now"

echo "Creating new instance"
userdata="curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh && chmod +x ./lightsail-compose.sh && ./lightsail-compose.sh"

awsresult=`aws lightsail create-instances --instance-names Cracker-app --user-data "$userdata" --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0`

echo "$awsresult"

echo "Waiting for instance to run..."

n=1

while [ $n -le 6 ]
do
    awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
    echo "$awsinstancestate1"

    if [[ $awsinstancestate1 == *"stopped"* ]]; then
        echo "It is stopped."
    elif [[ $awsinstancestate1 == *"pending"* ]]; then
        echo "It is pending."
    elif [[ $awsinstancestate1 == *"stopping"* ]]; then
        echo "It is stopping."
    elif [[ $awsinstancestate1 == *"running"* ]]; then
        echo "It is running!"
        break
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

echo "Allocating new static IP"
awsallocate=`aws lightsail allocate-static-ip --static-ip-name Cracker-app-ip`
echo "$awsallocate"

echo "Attaching new static IP to the instance"
awsattach=`aws lightsail attach-static-ip --static-ip-name Cracker-app-ip --instance-name Cracker-app`
echo "$awsattach"

echo "Press any key to exit..."

read  