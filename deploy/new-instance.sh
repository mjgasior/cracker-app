now=$(date)
echo "$now"

echo "Creating new instance"
userdata="curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/deploy/lightsail-compose.sh && chmod +x ./lightsail-compose.sh && ./lightsail-compose.sh"

awsresult=`aws lightsail create-instances --instance-names Cracker-app --user-data "$userdata" --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0`

echo "$awsresult"

awsinstancestate1=`aws lightsail get-instance-state --instance-name Cracker-app`
echo "$awsinstancestate1"

echo "Wait for instance to run..."
sleep 1m # Usually it is around 30 seconds for the mashine to start running

# try to loop this https://cameronnokes.com/blog/working-with-json-in-bash-using-jq/
# https://stackoverflow.com/questions/27127091/parse-json-in-shell
# without jq -> https://stackoverflow.com/questions/229551/how-to-check-if-a-string-contains-a-substring-in-bash

awsinstancestate2=`aws lightsail get-instance-state --instance-name Cracker-app`
echo "$awsinstancestate2"

echo "Allocating new static IP"
awsallocate=`aws lightsail allocate-static-ip --static-ip-name Cracker-app-ip`
echo "$awsallocate"

echo "Attaching new static IP to the instance"
awsattach=`aws lightsail attach-static-ip --static-ip-name Cracker-app-ip --instance-name Cracker-app`
echo "$awsattach"

echo "Press any key to exit..."

read  