now=$(date)
echo "$now"

userdata="curl -o lightsail-compose.sh https://raw.githubusercontent.com/mjgasior/cracker-app/master/lightsail-compose.sh && chmod +x ./lightsail-compose.sh && ./lightsail-compose.sh"

myresult=`aws lightsail create-instances --instance-names Cracker-app --user-data "$userdata" --availability-zone eu-central-1a --blueprint-id ubuntu_16_04_2 --bundle-id nano_2_0`

echo "$myresult"

read  