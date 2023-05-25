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
// readWrite user
admin.createUser({
  user: "sharding-user-prod",
  pwd: "admin",
  roles: [
    {
      role: "readWrite",
      db: "sharding-prod",
    },
  ],
});
// read-only user
admin.createUser({
  user: "read-user",
  pwd: "readonly",
  roles: [
    {
      role: "read",
      db: "sharding-prod",
    },
  ],
});
