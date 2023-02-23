Below please find the instructions on how to use the MigratoryData Client API for Javascript with React-Native:

Install the `Expo` environment for building React-Native applications as explained [here](https://reactnative.dev/docs/environment-setup)

```bash
npx create-expo-app demo

cd demo
```

Replace the default file `App.js` from the folder `demo` with the example file `App.js` found in this directory.
 
Install the MigratoryData Node JS client API dependency:

```sh
npm i migratorydata-client
```

Run the example React-Native app:

```
npx expo start
```

The client application connects to the MigratoryData server deployed at `localhost:8800` and subscribes to the subject `/server/status`.

If you don't have a MigratoryData server installed on your machine but there is docker installed you can run the following command to start MigratoryData server, otherwise you can download and install the latest version for your os from [here](/downloads/migratorydata-6/).

This example application connects to our demo MigratoryData server, subscribes to the subject `/demo/notification` and receives real-time messages triggered from the server-side every 15 seconds.

```sh
docker pull migratorydata/server:latest
docker run -d --name my_migratorydata -p 8800:8800 migratorydata/server:latest
```

To publish a message to subject `/server/status`, open the browser and access the address of the MigratoryData server and open the `Debug Console`.