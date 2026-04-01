import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      shareId: user.shareId,
    },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" },
  );
}
