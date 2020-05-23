#7 . `docker cp ./ cracker-db:./` - copy MongoDB backup from instance host to Docker container (the directory with backup should be present at the very top of the tree)
#8. `docker exec -it cracker-db sh` - turn on shell on Lightsail instance in MongoDB container
#9. `mongorestore name_of_directory/graphqldb/*.bson` - restore the `graphqldb` database in the instance

echo "Connecting to Lightsail instance $1"

echo "Current working directory:"
pwd

echo "Files in current working directory:"
ls

echo "Copying database dump to Lightsail instance"
scp -r ./dump ubuntu@$1:./dump

echo "Accessing Lightsail instance"
ssh ubuntu@$1 "ls && docker ps"

ssh ubuntu@$1 

read