now=$(date)
echo "$now"

echo "Creating new instance"
userdata="curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh && chmod +x ./lightsail-compose.sh && ./lightsail-compose.sh"

awsresult=`aws lightsail create-instances --instance-names Cracker-app --user-data "$userdata" --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0`

echo "$awsresult"

echo "Allocating new static IP"
awsallocate=`aws lightsail allocate-static-ip --static-ip-name Cracker-app-ip`
echo "$awsallocate"

echo "Attaching new static IP to the instance"
awsattach=`aws lightsail attach-static-ip --static-ip-name Cracker-app-ip --instance-name Cracker-app`
echo "$awsattach"

read  