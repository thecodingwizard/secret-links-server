import * as express from "express";

export default function(db) {
	const router = express.Router();

	router.post("/:accessUrl", (req, res) => {
		const accessUrl = req.params.accessUrl;
		const data = req.body.data;
	});

	return router;
}