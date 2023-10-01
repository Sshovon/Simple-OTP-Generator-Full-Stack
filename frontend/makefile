# Makefile for Next.js Dockerization

# Variables
DOCKER_IMAGE_NAME := my-next-app
DOCKER_CONTAINER_NAME := next-app-container
DOCKER_PORT := 3000
APP_PORT := 3000

.PHONY: build run stop clean

build:
	@docker build -t $(DOCKER_IMAGE_NAME) .

run:
	@docker run -d -p $(DOCKER_PORT):$(APP_PORT) --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME)

stop:
	@docker stop $(DOCKER_CONTAINER_NAME)
	@docker rm $(DOCKER_CONTAINER_NAME)

clean: stop
	@docker rmi $(DOCKER_IMAGE_NAME)

all: build run