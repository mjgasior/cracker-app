#8. `docker exec -it cracker-db sh` - turn on shell on Lightsail instance in MongoDB container
#9. `mongorestore name_of_directory/graphqldb/*.bson` - restore the `graphqldb` database in the instance

echo -e "\e[92mConnecting to Lightsail instance $1"

echo -e "\e[92mCurrent working directory:"
pwd

echo -e "\e[92mFiles in current working directory:"
ls

echo -e "\e[92mCopying database dump to Lightsail instance"
scp -r ./dump ubuntu@$1:./

echo -e "\e[92mCopying dump to MongoDB Docker container on the instance"
ssh ubuntu@$1 "docker cp ./dump cracker-db:./ && docker exec cracker-db mongorestore ./dump/graphqldb/*.bson"

echo -e "\e[92mRunning MongoDB database restore"
ssh ubuntu@$1 ""

echo -e "\e[92mDelete dump from "
ssh ubuntu@$1 
echo -e "\e[96mPress any key to exit..."

read