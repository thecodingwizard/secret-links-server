"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(res, message, statusCode = 500) {
    return res.status(statusCode).json({
        message
    });
}
exports.handleError = handleError;
//# sourceMappingURL=utils.js.map