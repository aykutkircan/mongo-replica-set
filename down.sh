#!/bin/bash

export COMPOSE_PROJECT_NAME=docker

# Parametreleri yakala
ENV=$1
options=$2

# --volumes parametresine göre işlem yap
if [[ "$options" == "--volumes" ]]; then

  docker-compose --file "docker-compose-${ENV}.yaml" down --volumes
  rm -rf ./mongo-shard-scripts/${ENV}/mongodb.key
else

  docker-compose --file "docker-compose-${ENV}.yaml" down

fi


