MYSQL_CONTAINER:=mysql-container
MYSQL_IMAGE:=mysql:latest
mysql-start:
	docker run -d  --rm --name ${MYSQL_CONTAINER} -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 ${MYSQL_IMAGE}

# Stop mysql Docker container
mysql-stop:
	docker stop ${MYSQL_CONTAINER}

mysql: mysql-stop mysql-start
