rs.initiate({
  _id: "mongo-configserver", // string: <replSet>
  configsvr: true,
  version: 1,
  members: [
    { _id: 0, host: "preprod-configserver-01:27017" }, // string: <docker-service>:<port>
    { _id: 1, host: "preprod-configserver-02:27017" }, // string: <docker-service>:<port>
    { _id: 2, host: "preprod-configserver-03:27017" }, // string: <docker-service>:<port>
  ],
});
