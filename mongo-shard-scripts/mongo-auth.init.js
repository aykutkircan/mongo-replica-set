admin = db.getSiblingDB("admin");
admin.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "userAdminAnyDatabase",
      db: "admin",
    },
  ],
});

admin.auth("admin", "admin");
admin.createUser({
  user: "sharding-user",
  pwd: "admin",
  roles: [
    {
      role: "readWrite",
      db: "sharding-dev",
    },
  ],
});
