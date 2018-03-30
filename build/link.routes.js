"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
    res.send("Hello!");
});
exports.default = router;
//# sourceMappingURL=link.routes.js.map