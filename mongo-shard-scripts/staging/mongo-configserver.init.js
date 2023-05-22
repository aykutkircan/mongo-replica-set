rs.initiate({
  _id: "mongo-configserver", // string: <replSet>
  configsvr: true,
  version: 1,
  members: [
    { _id: 0, host: "staging-configserver-01:27017" }, // string: <docker-service>:<port>
    { _id: 1, host: "staging-configserver-02:27017" }, // string: <docker-service>:<port>
    { _id: 2, host: "staging-configserver-03:27017" }, // string: <docker-service>:<port>
  ],
});
