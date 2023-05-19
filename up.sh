#!/bin/bash

## Composer project name instead of git main folder name
export COMPOSE_PROJECT_NAME=mongodbdocker

## Generate global auth key between cluster nodes
openssl rand -base64 756 > ./mongodb.key
chmod 600 ./mongodb.key

## Start the whole stack
docker-compose --file docker-compose-multi-shard.yaml up -d

## Config servers setup
docker exec -it mongodbdocker-mongo-configserver-01-1 sh -c "mongosh --port 27017 < /mongo-configserver.init.js"

## Shard servers setup
docker exec -it mongodbdocker-mongo-shard-01a-1 sh -c "mongosh --port 27018 < /mongo-shard-01.init.js"
docker exec -it mongodbdocker-mongo-shard-02a-1 sh -c "mongosh --port 27019 < /mongo-shard-02.init.js"
docker exec -it mongodbdocker-mongo-shard-03a-1 sh -c "mongosh --port 27020 < /mongo-shard-03.init.js"

## Apply sharding configuration
sleep 15
docker exec -it mongodbdocker-mongo-router-01-1 sh -c "mongosh --port 27017 < /mongo-sharding.init.js"

sleep 2
# ## Enable admin account
docker exec -it mongodbdocker-mongo-router-01-1 sh -c "mongosh --port 27017 < /mongo-auth.init.js"
