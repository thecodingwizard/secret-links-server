import * as express from "express";
import linkRoutes from "./link.routes";

const app = express();
app.set("port", (process.env.PORT || 3000));

// CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use("/links", linkRoutes);

app.listen(app.get("port"), () => console.log(`Server up`));

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
	console.log("Shutting down");
	process.exit(0);
}