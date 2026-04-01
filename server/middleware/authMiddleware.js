import jwt from "jsonwebtoken";

export function requireAuth(req, _res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    const error = new Error("Authentication required");
    error.statusCode = 401;
    next(error);
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    next();
  } catch {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    next(error);
  }
}
