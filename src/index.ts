import * as express from "express";
import * as mongodb from "mongodb";
import linkRoutes from "./link.routes";

const app = express();
app.use(express.json());
app.set("port", (process.env.PORT || 3000));

// CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const mongodbURL = process.env.MONGODB_URI || "mongodb://localhost:27017/secretlinks";
mongodb.MongoClient.connect(mongodbURL, (err, client) => {
	if (err) {
		console.log("[Database] Error connecting to MongoDB", err);
		process.exit(1);
	}
	
	// Save database object from the callback for reuse.
	const db = client.db();
	console.log("[Database] Connection ready");
	
	db.collection("links").createIndex("accessUrl", { unique: true });
	app.use("/links", linkRoutes(db));
	
	app.listen(app.get("port"), () => console.log(`Server up`));
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
	console.log("Shutting down");
	process.exit(0);
}