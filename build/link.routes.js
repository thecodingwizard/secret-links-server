"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("./utils");
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
        db.collection("links").find({ accessUrl }).toArray((err, docs) => {
            if (err) {
                return utils_1.handleError(res, "Failed to get link: " + err);
            }
            if (docs.length < 1) {
                return utils_1.handleError(res, "Link not found.", 404);
            }
            res.json(docs[0]);
        });
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=link.routes.js.map