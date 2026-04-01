export function notFoundHandler(req, res, _next) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message || "Unexpected server error",
  });
}
