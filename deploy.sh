echo "Deployment script"
echo $(pwd)

cd cracker-product
ls

docker-compose -f docker-compose.prod.yml build

read name