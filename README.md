# Faye Server - Bayeux protocol

### Requirements
1 redis instance running on localhost:6379
npm
pm2

### Installation and Run

Install and run services: we have 2: 1 node and 4 nodes. both serving on separated endpoint

```
npm install && pm2 start ecosystem.config.js
```

Now make symbolic link or copy ```apache-faye.local.conf``` to your apache sites and activate it