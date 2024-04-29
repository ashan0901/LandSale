import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not Authenticated" });
  jwt.verify(token, "w5bM3xexgzYx", async (err, payload) => {
    if (err) return res.status(403).json({ message: "Not valid" });
    req.userId = payload.id;
    next();
  });
};
