import * as express from "express";

const app = express();
app.set("port", (process.env.PORT || 3000));

// CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(app.get("port"), () => console.log(`Server up`));

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
	console.log("Shutting down");
	process.exit(0);
}