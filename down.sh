#!/bin/bash

export COMPOSE_PROJECT_NAME=mongodbdocker
docker-compose --file docker-compose-multi-shard.yaml down --volumes
rm -rf ./mongodb.key
