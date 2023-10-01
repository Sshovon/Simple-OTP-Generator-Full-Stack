# Define the Docker image name and tag
IMAGE_NAME = otp-api
IMAGE_TAG = latest

# Define the container names
OTP_CONTAINER_NAME = otp-api-container

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

# Shortcut for building, running, and stopping the OTP API container
all: build run

