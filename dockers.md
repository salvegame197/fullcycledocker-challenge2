docker run --rm -it --mount type=bind,source="$(pwd)",target=/app/src node bash

docker build -t salvegame/codeeducation:latest .

docker run --rm -it -p 3000:3000 --network app-network --mount type=bind,source="$(pwd)/app",target=/app/src node cd app/src && yarn dev

docker run --rm -it --network app-network --mount type=bind,source="$(pwd)/app",target=/app/src node bash

docker build -t salvegame/nginx-node .

docker run --rm -it -p 3000 --network app-network --mount type=bind,source="$(pwd)/app",target=/app/src --name node node bash

docker run --rm -it -p 8080:80 --network app-network salvegame/nginx-node

docker run --rm -p 3306:3306 --mount type=bind,source="$(pwd)/app",target=/app/src -e MYSQL_ROOT_PASSWORD=roott -e MYSQL_DATABASE=FC -e MYSQL_PASSWORD=root --name mysql mysql

mysql -uroot p-"roott" -e "show databases"

docker exec -i mysql mysql -p"roott" -e "show databases"

docker exec -i mysql sh -c 'exec mysql --default-character-set=utf8 -uroot -p"roott"' < ./app/init.sql

docker exec -i mysqlcontainer mysql -uroot -p"roott" -e "show databases"
