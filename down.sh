#!/bin/bash

export COMPOSE_PROJECT_NAME=docker

## Environment
ENV="$1"

docker-compose --file "docker-compose-${ENV}.yaml" down --volumes

rm -rf ./mongodb.key
