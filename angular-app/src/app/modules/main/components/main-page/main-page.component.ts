import { Component, OnInit } from '@angular/core';
import * as MigratoryDataClient from 'migratorydata-client';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public locationValue = 'http://127.0.0.1:8800';
  public tokenValue = 'some-token';
  public subscribeTopicValue = '/server/status';
  public publishTopicValue = '/server/status';
  public messageValue = 'Enter your message here!';
  public referenceValue = 'ref00000001';

  public subjects = new Set();

  public connected = false;

  public client: any;

  constructor() {
  }

  ngOnInit() {
  }

  public connect() {
    this.client = new MigratoryDataClient();
    this.client.setEntitlementToken(this.tokenValue);
    this.client.setServers([this.locationValue]);
    this.client.setMessageHandler(function (self) {
      return function (message) {
        self.handleMessage(self, message);
      }
    }(this));
    this.client.setStatusHandler(function (self) {
      return function (status) {
        self.handleStatus(self, status);
      }
    }(this));
    this.client.connect();
    this.connected = true;
    if (this.subjects.size != 0) {
      this.client.subscribe(Array.from(this.subjects));
    }
    document.getElementById("statusEvents").innerHTML += "<p>You are now able to 'subscribe' and 'publish'!</p>";
  }

  private handleMessage(self, message) {
    const messageEvents: HTMLElement = document.getElementById("messageEvents");
    messageEvents.innerHTML += "<p>" + message.subject + ":" + message.content + "</p>";
    messageEvents.scrollTop = messageEvents.scrollHeight;
  }

  private handleStatus(self, status) {
    const statusEvents: HTMLElement = document.getElementById("statusEvents");
    statusEvents.innerHTML += "<p>" + status.type + ":" + status.info + "</p>";
    statusEvents.scrollTop = statusEvents.scrollHeight;
  }

  public disconnect() {
    this.client.disconnect();
    this.connected = false;
    this.clearNotifications();
    this.clearMessages();
  }

  public subscribe() {
    if (!this.subjects.has(this.subscribeTopicValue)) {
      if (this.connected) {
        this.client.subscribe([this.subscribeTopicValue]);
      }
      this.subjects.add(this.subscribeTopicValue);
      this.actualizeSubscriptions();
    }
  }

  public unsubscribe() {
    if (this.subjects.has(this.subscribeTopicValue)) {
      if (this.connected) {
        this.client.unsubscribe([this.subscribeTopicValue]);
      }
      this.subjects.delete(this.subscribeTopicValue);
      this.actualizeSubscriptions();
    }
  }

  public publish() {
    if (this.connected) {
      let message = {
        subject: this.publishTopicValue,
        content: this.messageValue,
        closure: this.referenceValue
      };
      this.client.publish(message);
    }
  }

  private actualizeSubscriptions() {
    let subscriptions: HTMLElement = document.getElementById("subscriptions");
    subscriptions.innerHTML = "";
    for (let topic of this.subjects) {
      subscriptions.innerHTML += "<p>" + topic + "</p>";
    }
    subscriptions.scrollTop = subscriptions.scrollHeight;
  }

  public clearNotifications() {
    document.getElementById("statusEvents").innerHTML = "";
  }

  public clearMessages() {
    document.getElementById("messageEvents").innerHTML = "";
  }
}