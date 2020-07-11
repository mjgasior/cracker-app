echo -e "\e[93;104mCracker app scripts\e[0m\n"

read -p "Do you want to drop the database [Y/n]:" answer

if [ "$answer" = "Y" ]
then
    echo -e "\n\e[92mDeleting MongoDB database\e[0m"
    winpty docker exec -it cracker-db-dev mongo crackerappdb --eval 'db.dropDatabase()'

    echo -e "\e[96mPress any key to exit...\e[0m"
    read
fi