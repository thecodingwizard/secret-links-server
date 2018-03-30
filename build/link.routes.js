"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("./utils");
function default_1(db) {
    const router = express.Router();
    router.post("/:accessUrl", (req, res) => {
        const accessUrl = req.params.accessUrl;
        const data = req.body.data;
        if (!data) {
            return utils_1.handleError(res, "Data cannot be null.", 400);
        }
        const link = { accessUrl, data };
        db.collection("links").insertOne(link, (err, doc) => {
            if (err) {
                return utils_1.handleError(res, "Failed to insert link: " + err);
            }
            res.status(201).send("OK");
        });
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=link.routes.js.map