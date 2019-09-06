var http = require('http'),
	faye = require('faye');
	redis = require('faye-redis');

if (!bayeux) {


	bayeux = new faye.NodeAdapter(options);
}

var options = {
	mount: "/faye",
	timeout: 30,
	engine: {
		type: redis,
		host: "localhost",
		port: 6379
	}
};

var bayeux = new faye.NodeAdapter(options);

// logging
bayeux.on('handshake', function (clientId) {
	console.log(`%s [handshake] --> ${clientId}`, new Date());
});

bayeux.on('subscribe', function (clientId, channel) {
	console.log(`%s [subscribe] client=${clientId} on ${channel}`, new Date());
});

bayeux.on('disconnect', function (clientId) {
	console.log(`%s [disconnect] !-> client=${clientId}`, new Date());
})

bayeux.addExtension({
	incoming: function (message, req, callback) {
		const { connection: { remotePort } } = req;
		if (message.channel.match(/^\/meta\/(connect|subscribe)/)) {
			console.log(`%s [connect] = client=${message.clientId || 'none'}, port=${remotePort}`, new Date());
		} else if (!message.channel.match(/^\/meta/)) {
			//another channel
			console.log(message);
		}

		return callback(message);
	},
});


// Handle non-Bayeux requests
var server = http.createServer();

var port = process.argv[2] || 8800
console.log(`Running on portal ${port}`);
console.log(`=============================`);
console.log(`args=`, process.argv);
console.log(`=============================`);

bayeux.attach(server);
server.listen(port);