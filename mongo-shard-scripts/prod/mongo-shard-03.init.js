rs.initiate({
  _id: "mongo-shard-03", // string: <replSet>
  version: 1,
  members: [
    { _id: 0, host: "prod-shard-03a:27020" }, // string: <docker-service>:<port>
    { _id: 1, host: "prod-shard-03b:27020" }, // string: <docker-service>:<port>
    { _id: 2, host: "prod-shard-03c:27020" }, // string: <docker-service>:<port>
  ],
});
