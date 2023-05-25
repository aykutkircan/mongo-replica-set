#!/bin/bash

## Composer project name instead of git main folder name
export COMPOSE_PROJECT_NAME=docker

# Parametreleri yakala
ENV=$1
options=$2

echo "Process starting..."
sleep 2

echo "ENV is: ${ENV}"
echo "Option is: ${options}"
sleep 2

# --init parametresine göre işlem yap
if [[ "$options" == "--init" ]]; then
    # --init seçeneğiyle ilgili işlemler
    echo "Init işlemi yapılıyor..."
    # Generate global auth key between cluster nodes
    openssl rand -base64 756 > ./mongo-shard-scripts/${ENV}/mongodb.key
    chmod 600 ./mongo-shard-scripts/${ENV}/mongodb.key

    # Start the whole stack
    docker-compose --file "docker-compose-${ENV}.yaml" up -d

    ## Config servers setup
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-configserver-01-1" sh -c "mongosh --port 27017 < /mongo-configserver.init.js"

    ## Shard servers setup
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-shard-01a-1" sh -c "mongosh --port 27018 < /mongo-shard-01.init.js"
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-shard-02a-1" sh -c "mongosh --port 27019 < /mongo-shard-02.init.js"
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-shard-03a-1" sh -c "mongosh --port 27020 < /mongo-shard-03.init.js"

    ## Apply sharding configuration
    sleep 15
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-router-01-1" sh -c "mongosh --port 27017 < /mongo-sharding.init.js"

    ## Enable admin account
    sleep 5
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-router-01-1" sh -c "mongosh --port 27017 < /mongo-auth.init.js"
    # ...
else
    # --init seçeneği verilmediğinde yapılacak işlemler
    echo "Volume'leri silinmemiş DB'yi tekrar ayağa kaldırma işlemi yapılıyor..."
    # Start the whole stack
    docker-compose --file "docker-compose-${ENV}.yaml" up -d

    echo "Process in progress wait! (about 1 minute)"
    ## Enable admin account
    sleep 59
    docker exec -it "${COMPOSE_PROJECT_NAME}-${ENV}-router-01-1" sh -c "mongosh --port 27017 < /mongo-auth.js"
    # ...
fi

echo "Process finished."