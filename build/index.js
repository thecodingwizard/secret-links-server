"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const https = require("https");
const fs = require("fs");
const httpsOptions = {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem')
};
const app = express();
app.set("port", (process.env.PORT || 3000));
// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const server = https.createServer(httpsOptions, app);
server.listen(app.get("port"), () => console.log(`Server listening on port ${app.get("port")}`));
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
function shutdown() {
    console.log("Shutting down");
    process.exit(0);
}
//# sourceMappingURL=index.js.map