#!/bin/bash

export COMPOSE_PROJECT_NAME=docker

# Capture parameters
ENV=$1
options=$2

# Process based on the --volumes option
if [ "$options" = "--volumes" ]; then
  docker-compose --file "docker-compose-${ENV}.yaml" down --volumes
  rm -rf "./mongo-shard-scripts/${ENV}/mongodb.key"
else
  docker-compose --file "docker-compose-${ENV}.yaml" down
fi
