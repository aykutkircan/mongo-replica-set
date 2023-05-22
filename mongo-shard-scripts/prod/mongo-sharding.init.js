// mongo-shard-01 string: "<replSet>/<docker-service>:<port>"
sh.addShard("mongo-shard-01/prod-shard-01a:27018");
sh.addShard("mongo-shard-01/prod-shard-01b:27018");
sh.addShard("mongo-shard-01/prod-shard-01c:27018");

// mongo-shard-02 string: "<replSet>/<docker-service>:<port>"
sh.addShard("mongo-shard-02/prod-shard-02a:27019");
sh.addShard("mongo-shard-02/prod-shard-02b:27019");
sh.addShard("mongo-shard-02/prod-shard-02c:27019");

// mongo-shard-03 string: "<replSet>/<docker-service>:<port>"
sh.addShard("mongo-shard-03/prod-shard-03a:27020");
sh.addShard("mongo-shard-03/prod-shard-03b:27020");
sh.addShard("mongo-shard-03/prod-shard-03c:27020");
