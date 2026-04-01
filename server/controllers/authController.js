import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken } from "../utils/jwt.js";
import {
  createUser,
  findUserById,
  verifyUser,
} from "../services/userStore.js";

export const signup = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!name || !email || !password || password.length < 6) {
    const error = new Error("Name, email, and a 6+ character password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await createUser({ name, email, password });
  const token = createToken(user);
  res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req, res) => {
  const identifier = req.body.email?.trim() || req.body.identifier?.trim();
  const password = req.body.password?.trim();
  const user = await verifyUser(identifier, password);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = createToken(user);
  res.json({ user, token });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ user });
});
