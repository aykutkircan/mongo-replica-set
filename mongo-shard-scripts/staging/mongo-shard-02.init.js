rs.initiate({
  _id: "mongo-shard-02", // string: <replSet>
  version: 1,
  members: [
    { _id: 0, host: "staging-shard-02a:27019" }, // string: <docker-service>:<port>
    { _id: 1, host: "staging-shard-02b:27019" }, // string: <docker-service>:<port>
    { _id: 2, host: "staging-shard-02c:27019" }, // string: <docker-service>:<port>
  ],
});
