"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("./utils");
const CryptoJS = require("crypto-js");
function default_1(db) {
    const router = express.Router();
    router.post("/", (req, res) => {
        const { data, accessUrl } = req.body;
        if (!data || !accessUrl) {
            return utils_1.handleError(res, "AccessUrl and Data are required.", 400);
        }
        const link = { accessUrl, data };
        db.collection("links").insertOne(link, (err, doc) => {
            if (err) {
                return utils_1.handleError(res, "Failed to insert link: " + err);
            }
            res.status(201).send("OK");
        });
    });
    router.post("/:accessUrl", (req, res) => {
        const { accessUrl } = req.params;
        const { password } = req.body;
        if (password == null) {
            return utils_1.handleError(res, "Password is required", 400);
        }
        db.collection("links").find({ accessUrl }).toArray((err, docs) => {
            if (err) {
                return utils_1.handleError(res, "Failed to get link: " + err);
            }
            if (docs.length < 1) {
                return utils_1.handleError(res, "Link not found.", 404);
            }
            const encryptedLink = docs[0];
            let decryptedText;
            try {
                let bytes = CryptoJS.AES.decrypt(encryptedLink.data, password);
                decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            }
            catch (_a) {
                return utils_1.handleError(res, "Incorrect Password.", 401);
            }
            if (decryptedText == "") {
                return utils_1.handleError(res, "Incorrect Password.", 401);
            }
            try {
                const link = JSON.parse(decryptedText);
                res.send(link);
            }
            catch (_b) {
                utils_1.handleError(res, `Error Parsing JSON: ${decryptedText}`, 500);
            }
        });
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=link.routes.js.map