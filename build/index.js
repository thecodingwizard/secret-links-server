"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const link_routes_1 = require("./link.routes");
const app = express();
app.set("port", (process.env.PORT || 3000));
// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/links", link_routes_1.default);
app.listen(app.get("port"), () => console.log(`Server up`));
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
function shutdown() {
    console.log("Shutting down");
    process.exit(0);
}
//# sourceMappingURL=index.js.map