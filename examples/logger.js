var WebSocket = require("ws");
var ws = new WebSocket("ws://localhost:6437/");

ws.onmessage = function(event) {
	console.log(event.data);
	console.log("\n\n\n");
};