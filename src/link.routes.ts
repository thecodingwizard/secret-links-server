import * as express from "express";
import { handleError } from "./utils";
import { Link, EncryptedLink } from "./link";
import * as CryptoJS from "crypto-js";

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
				if (err.toString().indexOf("duplicate key error index:") !== -1) {
					return handleError(res, "Access URL taken.");
				}
				return handleError(res, "Failed to insert link: " + err);
			}
			res.status(201).json({
				message: "OK"
			});
		});
	});

	router.post("/:accessUrl", (req, res) => {
		const { accessUrl } = req.params;
		const { password } = req.body;

		if (password == null) {
			return handleError(res, "Password is required", 400);
		}

		db.collection("links").find({ accessUrl }).toArray((err, docs) => {
			if (err) {
				return handleError(res, "Failed to get link: " + err);
			}
			if (docs.length < 1) {
				return handleError(res, "Link not found.", 404);
			}
			const encryptedLink = docs[0];
			let decryptedText;
			try {
				let bytes = CryptoJS.AES.decrypt(encryptedLink.data, password)
				decryptedText = bytes.toString(CryptoJS.enc.Utf8);
			} catch {
				return handleError(res, "Incorrect Password.", 401);
			}
			if (decryptedText == "") {
				return handleError(res, "Incorrect Password.", 401);
			}
			try {
				const link = JSON.parse(decryptedText);
				res.send(link);
			} catch {
				handleError(res, `Error Parsing JSON: ${decryptedText}`, 500);
			}
		});
	});

	return router;
}