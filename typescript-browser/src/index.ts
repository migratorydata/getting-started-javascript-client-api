import MigratoryDataClient, { MigratoryDataMessage, MessageCallback, StatusCallback, LogCallback } from "migratorydata-client";

// define handlers
let logHandler:LogCallback = function(logMessage:any) {
	console.log(logMessage);
}

// This is the status handler used to process the status notifications
let statusHandler:StatusCallback = function(event) {
	var object = document.getElementById("status");
	if (object) {
		object.innerHTML = event.type + " (" + event.info + ")";
	}
}

// This is the message handler used to process the real-time messages
let messageHandler:MessageCallback = function (message:MigratoryDataMessage) {
	var object = document.getElementById("data");
	if (object) {
		var out = "[ ";
		out += message.subject + " = " + message.content;
		out += "]"

		object.innerHTML = out + "<br/>";
	}
}

let client:MigratoryDataClient = new MigratoryDataClient();

client.setLogHandler(logHandler);

// define the message handler used to process the real-time messages
client.setMessageHandler(messageHandler);

// define the status handler used to process the live status notifications
client.setStatusHandler(statusHandler);

// attach an authorization token to this client
client.setEntitlementToken("some-token");

// tell the client the location of your MigratoryData server(s)
client.setServers(["http://127.0.0.1:8800"]);

// subscribe
client.subscribe([ "/server/status" ]);

// connect
client.connect();

// add click() event on Publish button to send messages to the MigratoryData server
let publish_btn = document.getElementById("publish_btn");
publish_btn.addEventListener("click", (e:Event) => {
	let message:MigratoryDataMessage = {
		subject: "/server/status",
		content: (<HTMLInputElement>document.getElementById("content_id")).value,
		closure: "id - " + new Date().getTime()
	}
	client.publish(message);
});