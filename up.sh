#!/bin/bash

# Set the Composer project name instead of git main folder name
export COMPOSE_PROJECT_NAME=docker

# Capture parameters
ENV=$1
options=$2

echo "Process starting..."
sleep 2

echo "ENV is: ${ENV}"
echo "Option is: ${options}"
sleep 2

# Process based on the --init option
if [ "$options" = "--init" ]; then
    # Operations for the --init option
    echo "Init operation in progress..."
    # Generate global auth key between cluster nodes
    openssl rand -base64 756 > "./mongo-shard-scripts/${ENV}/mongodb.key"
    chmod 600 "./mongo-shard-scripts/${ENV}/mongodb.key"
    echo "chmod 600 success for './mongo-shard-scripts/${ENV}/mongodb.key' file"

    sleep 3

    # Start the whole stack
    docker-compose --file "docker-compose-${ENV}.yaml" up -d

    # Config servers setup
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-configserver-01-1" sh -c "mongosh --port 27017 < /mongo-configserver.init.js"

    # Shard servers setup
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-shard-01a-1" sh -c "mongosh --port 27018 < /mongo-shard-01.init.js"
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-shard-02a-1" sh -c "mongosh --port 27019 < /mongo-shard-02.init.js"
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-shard-03a-1" sh -c "mongosh --port 27020 < /mongo-shard-03.init.js"

    # Apply sharding configuration
    sleep 15
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-router-01-1" sh -c "mongosh --port 27017 < /mongo-sharding.init.js"

    # Enable admin account
    sleep 5
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-router-01-1" sh -c "mongosh --port 27017 < /mongo-auth.init.js"
else
    # Operations when the --init option is not provided
    echo "Starting the previously deployed DB without deleting volumes..."
    # Start the whole stack
    docker-compose --file "docker-compose-${ENV}.yaml" up -d

    echo "Process in progress. Please wait! (about 1 minute)"
    # Enable admin account
    sleep 59
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-router-01-1" sh -c "mongosh --port 27017 < /mongo-auth.js"
fi

echo "Process finished."
