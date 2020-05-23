echo "Preparing a MongoDB dump"
winpty docker exec -it cracker-db-dev sh -c 'mongodump && exit'

echo 'Copying dump from Docker container'
docker cp cracker-db-dev:/dump ./dump

echo 'Done - press any key'

read