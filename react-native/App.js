import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

require("migratorydata-client");

export default class App extends React.Component {

  constructor() {
        super()
        this.client = new MigratoryDataClient();

        this.state = {
           status: 'no_status',
           message: 'no_update'
        }
     }
 
  statusUpdate = (e) =>  {
    console.log("Got status : " + e.type + " : " + e.info);

    this.setState({status: e.type + " : " + e.info});
  }

  messageUpdate = (message) => {
    console.log("Got message : [" + message.subject + " = " + message.content + "]");

    this.setState({message: out});
  }

  onStartMdsClient = () => {
    client.setStatusHandler(this.statusUpdate);
    client.setMessageHandler(this.messageUpdate);

    client.setEntitlementToken("some-token");
    client.setServers([ "http://127.0.0.1:8800" ]);
    client.subscribe([ "/server/status" ]);
    client.connect();
  }

  onStopMdsClient = () => {
    client.disconnect();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Status : {this.state.status}</Text>
        <Text>Update : {this.state.message}</Text>
        <Button
          onPress={this.onStartMdsClient}
          title="Start MigratoryDataClient"
        />
        <Button
          onPress={this.onStopMdsClient}
          title="Stop MigratoryDataClient"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

