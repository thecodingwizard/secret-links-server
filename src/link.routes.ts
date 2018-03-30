import * as express from "express";
import { handleError } from "./utils";
import { Link, EncryptedLink } from "./link";

export default function(db) {
	const router = express.Router();

	router.post("/", (req, res) => {
		const { data, accessUrl } = req.body;

		if (!data || !accessUrl) {
			return handleError(res, "AccessUrl and Data are required.", 400);
		}

		const link: EncryptedLink = { accessUrl, data };
		db.collection("links").insertOne(link, (err, doc) => {
			if (err) {
				return handleError(res, "Failed to insert link: " + err);
			}
			res.status(201).send("OK");
		});
	});

	router.get("/:accessUrl", (req, res) => {
		const { accessUrl } = req.params;

		db.collection("links").find({ accessUrl }).toArray((err, docs) => {
			if (err) {
				return handleError(res, "Failed to get link: " + err);
			}
			if (docs.length < 1) {
				return handleError(res, "Link not found.", 404);
			}
			res.json(docs[0]);
		});
	});

	return router;
}