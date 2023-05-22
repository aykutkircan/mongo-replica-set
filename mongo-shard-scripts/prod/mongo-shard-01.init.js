rs.initiate({
  _id: "mongo-shard-01", // string: <replSet>
  version: 1,
  members: [
    { _id: 0, host: "prod-shard-01a:27018" }, // string: <docker-service>:<port>
    { _id: 1, host: "prod-shard-01b:27018" }, // string: <docker-service>:<port>
    { _id: 2, host: "prod-shard-01c:27018" }, // string: <docker-service>:<port>
  ],
});
