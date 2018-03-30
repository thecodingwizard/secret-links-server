"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
function default_1(db) {
    const router = express.Router();
    router.post("/:accessUrl", (req, res) => {
        const accessUrl = req.params.accessUrl;
        const data = req.body.data;
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=link.routes.js.map