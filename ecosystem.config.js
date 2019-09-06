module.exports = {
  "apps": [
    {
      "name"        : "faye-sandbox-cluster",
      "script"      : "./server.js",
      "watch"       : false,
      "instances": 4,
      "args":"8100",
      "exec_mode": 'cluster',
      "env": {
        "NODE_ENV": "development"
      },
      "env_production" : {
         "NODE_ENV": "production"
      }
    },
    {
      "name"        : "faye-sandbox-onenode",
      "script"      : "./server.js",
      "watch"       : false,
      "instances": 1,
      "args":"8200",
      "env": {
        "NODE_ENV": "development"
      },
      "env_production" : {
         "NODE_ENV": "production"
      }
    }    
  ]
}
