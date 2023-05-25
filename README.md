# mongodb-sharding-docker-compose

:whale: docker-compose stack that allows you to turn on a full MongoDB sharded cluster with the following components :

- configserver replicaset: 3x mongod with configsrv enabled
- first replicaset shard: 3x mongod
- second replicaset shard: 3x mongod
- third replicaset shard: 3x mongod
- mongo query router: 1x mongos
- authentication enabled + global auth key certificate between nodes

:warning: Of course this is for development purpose only

    # Usage :
    $ git clone git@github.com:aykutkircan/mongo-replica-set.git
    $ cd mongo-replica-set/

if you are going to start the services for the first time
you should add the '--init' flag

    $ ./up.sh 'staging' --init
    or
    $ ./up.sh 'prod' --init
    or
    $ ./up.sh 'preprod' --init

If you have installed the services before and you have db and config
in the data folder in the root directory, you can continue as follows

    $ ./up.sh 'staging'
    or
    $ ./up.sh 'prod'
    or
    $ ./up.sh 'preprod'


You can also edit mongo-auth.init.js to change admin credentials before turning up the cluster

    admin = db.getSiblingDB("admin")
    admin.createUser(
      {
         user: "admin",
         pwd: "admin",
         roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
      }
    )

:beer: And turn it down with:

    $ ./down.sh 'staging'
    or
    $ ./down.sh 'prod'
    or
    $ ./down.sh 'prod'


How to connect to your DB

    $ mongodb://<username:password>@localhost:<port>/<your-db-nname>?authSource=admin