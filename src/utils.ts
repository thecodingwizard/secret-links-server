export function handleError(res, message, statusCode = 500) {
	return res.status(statusCode).json({
		message
	});
}