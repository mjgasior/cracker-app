#8. `docker exec -it cracker-db sh` - turn on shell on Lightsail instance in MongoDB container
#9. `mongorestore name_of_directory/graphqldb/*.bson` - restore the `graphqldb` database in the instance

echo "Connecting to Lightsail instance $1"

echo "Current working directory:"
pwd

echo "Files in current working directory:"
ls

echo "Copying database dump to Lightsail instance"
scp -r ./dump ubuntu@$1:./

echo "Copying dump to MongoDB Docker container on the instance"
ssh ubuntu@$1 "docker cp ./dump cracker-db:./"

echo "Running MongoDB database restore"
ssh ubuntu@$1 "docker exec cracker-db mongorestore ./dump/graphqldb/*.bson"

echo "Accessing Lightsail instance"
ssh ubuntu@$1 
echo "Press any key to exit..."

read