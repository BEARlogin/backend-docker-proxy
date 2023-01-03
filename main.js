const {runApp} = require("./app");

runApp(process.env.PROXY_TO, process.env.REPLACED_ORIGIN, process.env.HOST_PORT)
