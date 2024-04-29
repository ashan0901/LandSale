import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  //veryfy the token first
  console.log(req.userId);
  res.status(200).json({ message: "You are authenticated" });
};
export const shouldBeAdmin = async (req, res) => {};
