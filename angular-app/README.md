This is an angular example of a javascript client application using the MigratoryData Client API for Javascript.

To run the demo application we need to install the necessary packages. Also we need `@angular/cli` executable to run the demo application. To install all the dependencies run commands:

```bash
npm install
npm install -g @angular/cli
```

The client application connects to the MigratoryData server deployed at `localhost:8800` subscribes and publishes messages on the subject `/server/status`. To publish a message press the `Publish` button.

If you don't have a MigratoryData server installed on your machine but there is docker installed you can run the following command to start MigratoryData server, otherwise you can download and install the latest version for your os from [here](/downloads/migratorydata-6/).

```sh
docker pull migratorydata/server:latest
docker run -d --name my_migratorydata -p 8800:8800 migratorydata/server:latest
```

Next, run the application using command:

```sh
ng serve
```

Navigate to `http://localhost:4200/` to open the application.
