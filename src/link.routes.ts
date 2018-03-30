import * as express from "express";
import { handleError } from "./utils";
import { Link, EncryptedLink } from "./link";

export default function(db) {
	const router = express.Router();

	router.post("/:accessUrl", (req, res) => {
		const accessUrl = req.params.accessUrl;
		const data = req.body.data;

		if (!data) {
			return handleError(res, "Data cannot be null.", 400);
		}

		const link: EncryptedLink = { accessUrl, data };
		db.collection("links").insertOne(link, (err, doc) => {
			if (err) {
				return handleError(res, "Failed to insert link: " + err);
			}
			res.status(201).send("OK");
		});
	});

	return router;
}