# Define the Docker image name and tag
IMAGE_NAME = otp-api
IMAGE_TAG = latest

# Define the container names
OTP_CONTAINER_NAME = otp-api-container
MONGODB_CONTAINER_NAME = mongodb-container

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

# Run the OTP API Docker container
LOGS_DIR := $(shell pwd)/logs
run:
	docker run -d --rm -v ${LOGS_DIR}:/app/logs  -p 3000:3000 --name $(OTP_CONTAINER_NAME) $(IMAGE_NAME):$(IMAGE_TAG)

# Stop and remove the OTP API Docker container
stop:
	docker stop $(OTP_CONTAINER_NAME)

# Remove the OTP API Docker image
clean:
	docker rmi $(IMAGE_NAME):$(IMAGE_TAG)

# Start a mysql Docker container

MYSQL_CONTAINER:=mysql-container
MYSQL_IMAGE:=mysql:latest
mysql-start:
	docker run -d  --rm --name ${MYSQL_CONTAINER} -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 ${MYSQL_IMAGE}

# Stop mysql Docker container
mysql-stop:
	docker stop ${MYSQL_CONTAINER}

mysql: mysql-stop mysql-start

# Shortcut for building, running, and stopping the OTP API container
all: build run

