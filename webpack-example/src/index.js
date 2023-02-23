var MigratoryDataClient = require("migratorydata-client");

var client = new MigratoryDataClient();
// attach an authorization token to this client
client.setEntitlementToken("some-token");

// tell the client the location of your MigratoryData server(s)
client.setServers(["http://127.0.0.1:8800"]);

// define the message handler used to process the real-time messages
client.setMessageHandler(messageHandler);

// define the status handler used to process the live status notifications
client.setStatusHandler(statusHandler);

// subscribe
client.subscribe([ "/server/status" ]);

// connect
client.connect();

// This is the message handler used to process the real-time messages
function messageHandler(message) {
	var object = document.getElementById("data");
	if (object) {
		var out = "[ ";
		out += message.subject + " = " + message.content;
		out += "]"

		object.innerHTML = out + "<br/>";
	}
}

// This is the status handler used to process the status notifications
function statusHandler(event) {
	var object = document.getElementById("status");
	if (object) {
		object.innerHTML = event.type + " (" + event.info + ")";
	}
}

// this function is used to send messages to the MigratoryData server
window.publish = function() {
	var date = new Date();
	var time = date.getTime();

	client.publish({
		subject : "/server/status",
		content : document.getElementById("content_id").value,
		closure : "id-" + time
	});
}

