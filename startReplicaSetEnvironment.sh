#!/bin/bash

DELAY=10

docker-compose --file docker-compose-multi-shard.yaml down

docker-compose --file docker-compose-multi-shard.yaml up -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

chmod +x ./scripts/rs-init.sh
docker exec mongo1 /scripts/rs-init.sh
